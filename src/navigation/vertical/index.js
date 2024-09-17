import influencer from "./influencer";
import influencerManagement from "./influencer-management";
import manage from "./manage";

export default [
  // {
  //   title: "Home",
  //   to: { name: "root" },
  //   icon: { icon: "tabler-smart-home" },
  // },
  // {
  //   title: "Influencer Finder",
  //   to: { name: "influencer-finder" },
  //   icon: { icon: "tabler-user-search" },
  // },
  // {
  //   title: "Influencer Profile",
  //   to: { name: "influencer-profile" },
  //   icon: { icon: "tabler-user" },
  // },
  ...influencer,
  ...influencerManagement,
  ...manage,
];
