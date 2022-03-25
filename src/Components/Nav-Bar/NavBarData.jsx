import logo from "../../logo.svg";
export const navBarData = {
  brandName: "Oasis",
  brandLogoUrl: `${logo}`,
  theme: "light",
  search: "Search on Oasis",
  navItems: [
    {
      id: 1,
      itemTitle: "Explore",
      dropdownItems: [
        "All NFTs",
        "Art",
        "Collectibles",
        "Domain Names",
        "Music",
        "Photography",
        "Sports",
        "Trading Cards",
        "Utility",
        "Virtual World",
      ],
    },
    {
      id: 2,
      itemTitle: "Stats",
      dropdownItems: ["Rankings", "Activity"],
    },
    {
      id: 3,
      itemTitle: "Resources",
      dropdownItems: [
        "Help Center",
        "Platform Status",
        "Partners",
        "Gas-Free Marketplace",
        "Taxes",
        "Blog",
        "Docs",
        "Newsletters",
      ],
    },
    {
      id: 4,
      itemTitle: "Create",
      dropdownItems: [],
    },
    {
      id: 5,
      itemTitle: "Login",
      dropdownItems: [
        "Profile",
        "Watchlist",
        "My Collections",
        "Settings",
        "Log Out",
      ],
    },
  ],
  // showDropdown:{this.showDropdownHadler},
  // dropDownItems:{this.state.NFTCollection}
};
