import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, e as renderSlot, f as createAstro, g as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DyNNiVaI.mjs';
import 'kleur/colors';
import { clsx } from 'clsx';
/* empty css                                 */
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Download, ChevronDown, Github } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Blink Eye - A minimalist eye care reminder app for Windows, macOS, and Linux"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/workspaces/AstroBlinkEyeTest/src/layouts/Layout.astro", void 0);

const StarryBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const n_stars = 150;
    const colors = [
      "#FE4C55",
      "#FF6363",
      "#FF7A7B",
      "#D94A54",
      "#E15761",
      "#FF8485",
      "#C4454A",
      "#FF9497",
      "#F3474F",
      "#FFA3A5",
      ...Array(98).fill("#fff")
    ];
    const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);
    class Star {
      x;
      y;
      radius;
      color;
      dy;
      constructor(x = randomInt(0, canvas?.width ?? window.innerWidth), y = randomInt(0, canvas?.height ?? window.innerHeight), radius = Math.random() * 1.1, color = colors[randomInt(0, colors.length)]) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = -Math.random() * 0.3;
      }
      draw() {
        const context = c;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.shadowBlur = randomInt(3, 15);
        context.shadowColor = this.color;
        context.strokeStyle = this.color;
        context.fillStyle = "rgba(255, 255, 255, .5)";
        context.fill();
        context.stroke();
        context.closePath();
      }
      update(arrayStars) {
        if (this.y - this.radius < 0) this.createNewStar(arrayStars);
        this.y += this.dy;
        this.draw();
      }
      createNewStar(arrayStars) {
        const i = arrayStars.indexOf(this);
        arrayStars.splice(i, 1);
        arrayStars.push(new Star());
      }
    }
    let stars = [];
    const init = () => {
      for (let i = 0; i < n_stars; i++) {
        stars.push(new Star());
      }
    };
    init();
    const animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => s.update(stars));
    };
    animate();
    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      c.scale(dpr, dpr);
      stars = [];
      init();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "w-full h-full fixed inset-0 -z-10 overflow-hidden"
    }
  );
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
async function fetchGithubReleases() {
  const response = await fetch("https://api.github.com/repos/nomandhoni-cs/blink-eye/releases");
  const releases = await response.json();
  const latestRelease = releases[0];
  latestRelease.total_downloads = latestRelease.assets.reduce(
    (total, asset) => total + asset.download_count,
    0
  );
  return latestRelease;
}
function getDownloadUrl(assets, pattern) {
  const asset = assets.find((asset2) => pattern.test(asset2.name));
  return asset?.browser_download_url || "#";
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DownloadSection = ({ releaseData }) => {
  const { assets, tag_name, total_downloads } = releaseData;
  const downloads = {
    windows: {
      main: getDownloadUrl(assets, /\.exe$/),
      alternatives: [
        { label: "Windows (EXE)", url: getDownloadUrl(assets, /\.exe$/) },
        { label: "Windows (MSI)", url: getDownloadUrl(assets, /\.msi$/) }
      ]
    },
    mac: {
      main: getDownloadUrl(assets, /arm64\.dmg$/),
      alternatives: [
        { label: "Mac (Apple Silicon)", url: getDownloadUrl(assets, /arm64\.dmg$/) },
        { label: "Mac (Intel)", url: getDownloadUrl(assets, /x64\.dmg$/) }
      ]
    },
    linux: {
      main: getDownloadUrl(assets, /\.deb$/),
      alternatives: [
        { label: "Linux (AppImage)", url: getDownloadUrl(assets, /\.AppImage$/) },
        { label: "Linux (DEB)", url: getDownloadUrl(assets, /\.deb$/) },
        { label: "Linux (RPM)", url: getDownloadUrl(assets, /\.rpm$/) },
        { label: "Linux (TAR.GZ)", url: getDownloadUrl(assets, /\.tar\.gz$/) }
      ]
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "relative max-w-6xl mx-auto py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center mb-8", children: "Download Free & Start Now" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: Object.entries(downloads).map(([platform, { main, alternatives }]) => /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "destructive",
          className: "flex items-center gap-2 rounded-r-none",
          asChild: true,
          children: /* @__PURE__ */ jsxs("a", { href: main, children: [
            /* @__PURE__ */ jsx(Download, { size: 20 }),
            "Download for ",
            platform.charAt(0).toUpperCase() + platform.slice(1)
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "rounded-l-none border-l border-red-700 px-2", children: /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) }) }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "bg-gray-900 border-gray-800", children: alternatives.map((alt) => /* @__PURE__ */ jsx(DropdownMenuItem, { className: "text-gray-200 hover:bg-gray-800", children: /* @__PURE__ */ jsx("a", { href: alt.url, className: "flex w-full", children: alt.label }) }, alt.label)) })
      ] })
    ] }, platform)) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 text-center max-w-2xl px-4", children: "Supports macOS (Intel/M1 Chip ARM64) | Windows 10, 11 (64/32 bit) | Linux (Debian, AppImage, RPM, Deb)" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-gray-800 rounded-full text-sm", children: [
        "Latest Release ",
        tag_name
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-gray-800 rounded-full text-sm", children: [
        "Total Downloads: ",
        total_downloads?.toLocaleString() || 0
      ] })
    ] })
  ] }) });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const releaseData = await fetchGithubReleases();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blink Eye - Eye Care Reminder App" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-black text-white"> <div class="fixed inset-0 overflow-hidden"> ${renderComponent($$result2, "StarryBackground", StarryBackground, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/AstroBlinkEyeTest/src/components/StarryBackground", "client:component-export": "default" })} </div> <!-- Hero Section --> <section class="container mx-auto px-4 pt-20 text-center relative z-10"> <h1 class="text-[#FE4C55] text-4xl font-bold mb-4">Blink Eye</h1> <h2 class="text-3xl md:text-4xl font-bold mb-4">
A minimalist eye care reminder app for<br>
Windows, macOS, and Linux.
</h2> <p class="text-gray-400 mb-8">
To reduce eye strain, featuring reminder with timers, full-screen popups. Based on 20-20-20 rule.
</p> ${renderComponent($$result2, "DownloadSection", DownloadSection, { "client:load": true, "releaseData": releaseData, "client:component-hydration": "load", "client:component-path": "/workspaces/AstroBlinkEyeTest/src/components/DownloadSection", "client:component-export": "default" })} </section> <!-- Features Section --> <section class="container mx-auto px-4 py-20 relative z-10"> <h2 class="text-3xl font-bold text-center mb-2">Features</h2> <p class="text-center text-gray-400 mb-12">All the necessary productivity tool in one place.</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${[
    {
      title: "Customizable Reminder Timers",
      description: "Set personalized break intervals to keep your eyes relaxed and on track"
    },
    {
      title: "Different Themes for Personalization",
      description: "Choose from various themes to match your interface and workflow"
    },
    {
      title: "Customizable Reminder Text",
      description: "Personalize reminder messages to keep you motivated"
    },
    {
      title: "Customizable Sounds",
      description: "Choose your own sounds for notifications"
    },
    {
      title: "Daily Device Usage Tracking",
      description: "Keep your screen time in control with detailed usage statistics"
    },
    {
      title: "Workday Setup",
      description: "Set up your daily working schedule for better productivity"
    }
  ].map((feature) => renderTemplate`<div class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg"> <h3 class="text-xl font-semibold mb-3">${feature.title}</h3> <p class="text-gray-400">${feature.description}</p> </div>`)} </div> </section> <!-- Open Source Section --> <section class="container mx-auto px-4 py-20 text-center relative z-10"> <h2 class="text-3xl font-bold mb-8">Proudly Open Source</h2> <p class="text-gray-400 mb-8">Blink Eye is open source and powered by open source software.</p> <a href="https://github.com/nomandhoni-cs/blink-eye" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"> ${renderComponent($$result2, "Github", Github, { "size": 24 })}
See code on GitHub
</a> </section> </main> ` })}`;
}, "/workspaces/AstroBlinkEyeTest/src/pages/index.astro", void 0);

const $$file = "/workspaces/AstroBlinkEyeTest/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
