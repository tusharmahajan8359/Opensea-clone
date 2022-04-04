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
      dropdownItems: [],
    },
    
    {
      id: 2,
      itemTitle: "Create",
      dropdownItems: [],
    },
    {
      id: 3,
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
