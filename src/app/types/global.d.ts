import { StaticImageData } from "next/image";

declare global {
  // PAGE PROPS

  type Section = {
    title: string;
    subtitle: string;
    body: Document;
    callToAction?: string;
    quote?: string;
    author?: string;
    image?: string;
  };
  
  type SectionProps = {
    section: {
      id: number; // Add id property to identify the section
      title: string;
      subtitle?: string;
      body: any; // Adjust this type according to your actual data
      quote?: string;
      author?: string;
      image?: string;
    };
    isReversed: boolean;
  };
  
  
  type PageContent = {
    form: FormProps | undefined;
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    date: string;
    sections?: Section[];
  };

  // END OF PAGE PROPS 
  // HEADER PROPS

  type HeaderProps = {
    href: string;
    label?: string;
    scrolled?: boolean;
    isDark?: boolean;
    onClick?: () => void;
    overrideScrollStyle?: boolean;
    noAnimations?: boolean;
  };

  interface NavigationTab {
    title: string;
    slug: string;
    tabs?: string[];
  }

  interface HeaderProps {
    isDark?: boolean;
    navigationTabs: NavigationTab[];
  }

  interface NavItemProps {
    label: string;
    isDark: boolean;
    dropdownOpen: boolean;
    onClick: () => void;
    isSelected: boolean;
    isInDrawer?: boolean;
  }

  interface MobileDrawerProps {
    drawerOpen: boolean;
    closeDrawer: () => void;
    navigationTabs: NavigationTab[];
    selectedNav: number | null;
    handleNavClick: (navIndex: number) => void;
    drawerRef: React.RefObject<HTMLDivElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
    isDark: boolean;
  }

  interface LogoProps {
    isDark: boolean;
    dropdownOpen: boolean;
    isMobile?: boolean;
  }

  interface DrawerToggleProps {
    isDark: boolean;
    toggleDrawer: () => void;
  }

  interface DropdownMenuProps {
    navigationTabs: NavigationTab[];
    dropdownOpen: boolean;
    dropdownRef: React.RefObject<HTMLDivElement>;
    isMobile: boolean;
    selectedNav: number | null;
    setSelectedNav: any;
    handleNavClick: (index: number) => void;
    isDark: boolean;
  }

  // END OF HEADER PROPS

  // FORM PROPS

  type FormField = {
    label: string;
    type?: string;
    placeholderText: string;
    validationRules?: string;
    id: number;
  };

  type FormProps = {
    title: string;
    description: any; // Rich text data
    submitText: string;
    successMessage: any; // Rich text data
    formFields?: FormField[];
  };

  // END OF FORM PROPS

  type SearchProps = {
    initialSearchTerm: string;
    initialTag: string;
    onSearch: (term: string) => void;
    onFilterByTag?: (tag: string) => void;
  };

  type Params = {
    slug: string;
  };

  //
  export type RichTextBody = {
    data: Record<string, unknown>;
    content: Array<{
      data: Record<string, unknown>;
      content: Array<{
        data: Record<string, unknown>;
        marks: unknown[];
        value: string;
        nodeType: string;
      }>;
      nodeType: string;
    }>;
    nodeType: string;
  };

  export type InsightProps = {
    title: string;
    subtitle?: string;
    tag?: string;
    body: string | RichTextBody;
    date: string;
    basePath: string;
    author?: string;
    tags?: string[];
    heroImage?: string | StaticImageData;
    images?: string[];
    isFeatured?: boolean;
    slug?: string;
  };

  export type CardProps = InsightProps & {
    backgroundImage?: string; // Specific to Card
    isDark?: boolean; // Specific to Card
    isFocused?: boolean;
    onClick?: () => void;
  };

  type CardGridProps = {
    insights: Insight[];
    itemsToShow: number;
    isDark: boolean;
  };

  type HorizontalCarouselProps = {
    items: { title: string; subtitle: string; image: string }[];
    currentIndex: number;
    handlePrev: () => void;
    handleNext: () => void;
    getTranslateValue: (index: number) => number;
  };

  type ParagraphProps = {
    title: string;
    body: string;
    image?: string;
    buttonUrl?: string;
    isReversed?: boolean;
    isCentered?: boolean;
  };

  type PageContent = {
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    date: string;
    form?: Form;
  };
}

export {};
