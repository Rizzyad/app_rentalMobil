import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate('/'),
    },
    {
      label: "Transaction",
      icon: "pi pi-shop",
      command: () => navigate('/transaction'),
    },
    {
      label: "Car",
      icon: "pi pi-car",
      command: () => navigate('/car'),
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://cdn-icons-png.flaticon.com/512/171/171239.png"
      height="40"
      className="mr-2"
    />
  );

  return <Menubar model={items} start={start} />;
};

export default Navbar;
