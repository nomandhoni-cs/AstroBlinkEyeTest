export interface GithubRelease {
  tag_name: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    download_count: number;
  }>;
  total_downloads?: number;
}