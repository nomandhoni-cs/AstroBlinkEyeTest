import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { GithubRelease } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchGithubReleases(): Promise<GithubRelease> {
  const response = await fetch('https://api.github.com/repos/nomandhoni-cs/blink-eye/releases');
  const releases = await response.json();
  const latestRelease = releases[0];

  // Calculate total downloads
  latestRelease.total_downloads = latestRelease.assets.reduce(
    (total: number, asset: { download_count: number }) => total + asset.download_count,
    0
  );

  return latestRelease;
}

export function getDownloadUrl(assets: GithubRelease['assets'], pattern: RegExp): string {
  const asset = assets.find(asset => pattern.test(asset.name));
  return asset?.browser_download_url || '#';
}