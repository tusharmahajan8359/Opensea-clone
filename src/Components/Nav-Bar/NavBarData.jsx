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
      itemTitle: "Profile",
      dropdownItems: ["My Collections"],
    },
  ],
  // showDropdown:{this.showDropdownHadler},
  // dropDownItems:{this.state.NFTCollection}
};
