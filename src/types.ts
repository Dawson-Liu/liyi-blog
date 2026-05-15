export interface WPTheme {
  name: string;
  description: string;
  link: string;
}

export interface WPPlugin {
  name: string;
  purpose: string;
}

export interface PostPlan {
  title: string;
  summary: string;
}

export interface BlogPlan {
  themes: WPTheme[];
  plugins: WPPlugin[];
  contentPlan: PostPlan[];
  seoTips: string[];
}
