import React from 'react';
import { Button } from './ui/button';
import { Download, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { GithubRelease } from '@/lib/types';
import { getDownloadUrl } from '@/lib/utils';

interface DownloadSectionProps {
  releaseData: GithubRelease;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ releaseData }) => {
  const { assets, tag_name, total_downloads } = releaseData;

  const downloads = {
    windows: {
      main: getDownloadUrl(assets, /\.exe$/),
      alternatives: [
        { label: 'Windows (EXE)', url: getDownloadUrl(assets, /\.exe$/) },
        { label: 'Windows (MSI)', url: getDownloadUrl(assets, /\.msi$/) }
      ]
    },
    mac: {
      main: getDownloadUrl(assets, /arm64\.dmg$/),
      alternatives: [
        { label: 'Mac (Apple Silicon)', url: getDownloadUrl(assets, /arm64\.dmg$/) },
        { label: 'Mac (Intel)', url: getDownloadUrl(assets, /x64\.dmg$/) }
      ]
    },
    linux: {
      main: getDownloadUrl(assets, /\.deb$/),
      alternatives: [
        { label: 'Linux (AppImage)', url: getDownloadUrl(assets, /\.AppImage$/) },
        { label: 'Linux (DEB)', url: getDownloadUrl(assets, /\.deb$/) },
        { label: 'Linux (RPM)', url: getDownloadUrl(assets, /\.rpm$/) },
        { label: 'Linux (TAR.GZ)', url: getDownloadUrl(assets, /\.tar\.gz$/) }
      ]
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto py-8">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-4xl font-bold text-center mb-8">
          Download Free & Start Now
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(downloads).map(([platform, { main, alternatives }]) => (
            <div key={platform} className="flex">
              <Button
                variant="destructive"
                className="flex items-center gap-2 rounded-r-none"
                asChild
              >
                <a href={main}>
                  <Download size={20} />
                  Download for {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="destructive" className="rounded-l-none border-l border-red-700 px-2">
                    <ChevronDown size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                  {alternatives.map((alt) => (
                    <DropdownMenuItem key={alt.label} className="text-gray-200 hover:bg-gray-800">
                      <a href={alt.url} className="flex w-full">
                        {alt.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 text-center max-w-2xl px-4">
          Supports macOS (Intel/M1 Chip ARM64) | Windows 10, 11 (64/32 bit) | Linux (Debian, AppImage, RPM, Deb)
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
            Latest Release {tag_name}
          </span>
          <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
            Total Downloads: {total_downloads?.toLocaleString() || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;