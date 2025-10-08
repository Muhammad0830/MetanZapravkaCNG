"use client"
import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';

const items: MenuProps['items'] = [
    {
        key: 'profile',
        label: 'Profile',
        icon: <UserOutlined />,
    },
    {
        type: 'divider',
    },
    {
        key: 'logout',
        label: 'Log Out',
        icon: <LogoutOutlined />,
        danger: true,
    },
];

const HeaderDropDown: React.FC = () => {
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'profile') {
            console.log('Profile ga o\'tish');
            // Router.push('/profile')
        } else if (e.key === 'logout') {
            console.log('Log out qilish');
            // Logout logikasi
        }
    };

    return (
        <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={['click']}
            placement="bottomRight"
        >
            <Avatar 
                style={{ 
                    cursor: 'pointer',
                    backgroundColor: '#1890ff'
                }}
                icon={<UserOutlined />}
            />
        </Dropdown>
    );
};

export default HeaderDropDown;