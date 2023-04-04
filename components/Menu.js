import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

export const LinkItem = ({ path, text, icon }) => {
  return (
    <Link href={`/auth/${path}`}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
};

export const mainListItems = (
  <>
    <LinkItem icon={<DashboardIcon/>} path='dashboard' text='Dashboard'/>
    {/*<LinkItem icon={<PeopleIcon/>} path='access' text='Access'/>*/}
  </>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      {/*Crud Functionalities*/}
    </ListSubheader>
      <LinkItem icon={<LibraryMusicIcon/>} path='doctors' text='Doctors'/>
      <LinkItem icon={<LibraryMusicIcon/>} path='specialities' text='Specialities'/>
      <LinkItem icon={<LibraryMusicIcon/>} path='hospitals' text='Hospitals'/>
      <LinkItem icon={<LibraryMusicIcon/>} path='schedules' text='Schedules'/>
  </React.Fragment>
);
