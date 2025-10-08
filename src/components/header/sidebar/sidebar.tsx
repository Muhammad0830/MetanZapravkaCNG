"use client";
import { Content, Header } from "antd/es/layout/layout";
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
    MdOutlineListAlt,
    MdPayment,
    MdOutlineAccessTime,
    MdOutlineInsertChart,
    MdOutlineSettings
} from "react-icons/md";
import { useState, useEffect } from "react";
import { Button, Layout, Menu } from 'antd';
import Sider from "antd/es/layout/Sider";
import { useTheme } from "next-themes";
import '@ant-design/v5-patch-for-react-19';
import { IoGlobeOutline } from "react-icons/io5";
import { TbGasStation } from "react-icons/tb";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import HeaderDropDown from "@/components/header/dropdown";

const SideBar = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme: currentTheme, setTheme } = useTheme();
    const isDark = currentTheme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    console.log("Current Theme:", currentTheme);

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={isDark ? "dark" : "light"}
                suppressHydrationWarning
                style={{
                    borderRight: '1px solid #d1d5db',
                }}
            >
                <div style={{
                    height: 32,
                    margin: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TbGasStation className="w-6 h-6" color={isDark ? 'white' : 'black'} />
                    {!collapsed && (
                        <span style={{
                            color: isDark ? 'white' : 'black',
                            marginLeft: 8,
                            fontWeight: 'bold',
                            fontSize: 24
                        }}>
                            MyGas
                        </span>
                    )}
                </div>
                <Menu
                    theme={isDark ? "dark" : "light"}
                    mode="inline"
                    className="border-t-[1px] border-gray-300"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <AppstoreOutlined />,
                            label: 'Bosh sahifa',
                        },
                        {
                            key: '2',
                            icon: <MdOutlineListAlt />,
                            label: 'Operatsiyalar',
                        },
                        {
                            key: '3',
                            icon: <MdPayment />,
                            label: `To'lovlar`,
                        },
                        {
                            key: '4',
                            icon: <MdOutlineAccessTime />,
                            label: 'Ish smenasi',
                        },
                        {
                            key: '5',
                            icon: <MdOutlineInsertChart />,
                            label: 'Hisobotlar',
                        },
                        {
                            key: '6',
                            icon: <MdOutlineSettings />,
                            label: 'Sozlamalar',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        height: 64.5,
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #d1d5db',
                        justifyContent: 'space-between',
                        backgroundColor: isDark ? '#001529' : '#ffffff',
                        color: isDark ? 'white' : 'black'
                    }}>
                    {/* Chap tomonda menu toggle */}
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            color: isDark ? 'white' : 'black',
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    {/* ✅ O'ng tomonda theme va til buttonlari */}
                    <div 
                        style={{
                            width: '8rem',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: 16,
                            // border: `1px solid black`,
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Theme toggle button */}
                        {mounted && (
                            <button
                                type="submit"
                                onClick={toggleTheme}
                                className={`p-[8px] rounded-lg transition-all ${isDark ? 'hover:bg-[#172554]' : 'hover:bg-[#e5e7eb]'}`}
                                style={{
                                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                                }}
                            >
                                {isDark ? (
                                    <MdSunny className="w-5 h-5" color="orange" />
                                ) : (
                                    <IoMdMoon className="w-5 h-5 text-black" />
                                )}
                            </button>
                        )}

                        {/* Til tanlash button */}
                        <button
                            type="button"
                            className={`p-[8px] rounded-lg transition-all ${isDark ? 'hover:bg-[#172554] border border-[#4b5563]' : 'hover:bg-[#e5e7eb] border border-[#d1d5db]'}`}
                            aria-label="Tilni tanlash"
                        >
                            <IoGlobeOutline className="w-5 h-5" color={isDark ? 'white' : 'black'} />
                        </button>

                        <HeaderDropDown />
                    </div>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        backgroundColor: isDark ? '#001529' : '#ffffff',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default SideBar;