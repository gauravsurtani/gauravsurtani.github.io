'use client'

import React from 'react';
import { PORTFOLIO_CONFIG } from './constants';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
  location: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  created_at: string;
  updated_at: string;
}

interface GitHubOrganization {
  login: string;
  description: string;
}

export interface GitHubStats {
  repositoryCount: number;
  organizationCount: number;
  followerCount: number;
  followingCount: number;
  accountAge: number; // in years
  topRepositories: GitHubRepo[];
  organizations: GitHubOrganization[];
}

const GITHUB_USERNAME = PORTFOLIO_CONFIG.githubUsername;
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for 5 minutes to avoid rate limiting
const CACHE_DURATION = PORTFOLIO_CONFIG.api.cacheTimeMs;
let cachedStats: GitHubStats | null = null;
let lastFetchTime = 0;

export async function fetchGitHubStats(): Promise<GitHubStats> {
  // Return cached data if still valid
  if (cachedStats && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedStats;
  }

  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!userResponse.ok) throw new Error('Failed to fetch user data');
    const userData: GitHubUser = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
    const reposData: GitHubRepo[] = await reposResponse.json();

    // Fetch organizations
    const orgsResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/orgs`);
    if (!orgsResponse.ok) throw new Error('Failed to fetch organizations');
    const orgsData: GitHubOrganization[] = await orgsResponse.json();

    // Calculate account age
    const accountCreated = new Date(userData.created_at);
    const accountAge = Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365));

    // Get top repositories by stars
    const topRepositories = reposData
      .filter(repo => !repo.name.startsWith('.'))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10);

    const stats: GitHubStats = {
      repositoryCount: userData.public_repos,
      organizationCount: orgsData.length,
      followerCount: userData.followers,
      followingCount: userData.following,
      accountAge,
      topRepositories,
      organizations: orgsData
    };

    // Cache the results
    cachedStats = stats;
    lastFetchTime = Date.now();

    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    // Return fallback data if API fails
    return {
      repositoryCount: PORTFOLIO_CONFIG.fallbackStats.repositoryCount,
      organizationCount: PORTFOLIO_CONFIG.fallbackStats.organizationCount,
      followerCount: PORTFOLIO_CONFIG.fallbackStats.followerCount,
      followingCount: PORTFOLIO_CONFIG.fallbackStats.followingCount,
      accountAge: PORTFOLIO_CONFIG.fallbackStats.accountAge,
      topRepositories: [],
      organizations: []
    };
  }
}

// Hook for easier use in React components
export function useGitHubStats() {
  const [stats, setStats] = React.useState<GitHubStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchGitHubStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
} 