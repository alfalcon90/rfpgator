"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import {
    BarChartSquare02,
    Calendar,
    CheckDone01,
    ChevronRight,
    Code02,
    File05,
    PieChart03,
    Rows01,
    SearchLg,
    Settings01 as Settings01Icon,
} from "@untitledui/icons";
import type { Color } from "react-aria-components";
import { ColorField, ColorSwatch, Radio, RadioGroup, parseColor } from "react-aria-components";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Dark, Light, System } from "@/components/application/modals/base-components/appearances";
import { DefaultBanner, DefaultBannerSM, NoneBanner, NoneBannerSM, SimplifiedBanner } from "@/components/application/modals/base-components/banners";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { Toggle } from "@/components/base/toggle/toggle";
import { cx } from "@/utils/cx";

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "appearance", label: "Appearance" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const themes = [
    {
        value: "system",
        label: "System preference",
        component: System,
    },
    {
        value: "light",
        label: "Light mode",
        component: Light,
    },
    {
        value: "dark",
        label: "Dark mode",
        component: Dark,
    },
];

const banners = [
    {
        value: "default",
        label: "Default",
        description: "Default solid brand color.",
        component: DefaultBanner,
        componentSM: DefaultBannerSM,
    },
    {
        value: "simplified",
        label: "Simplified",
        description: "Minimal and simplified.",
        component: SimplifiedBanner,
        componentSM: NoneBannerSM,
    },
    {
        value: "custom",
        label: "Custom styling",
        description: "Manage styling with CSS.",
        component: NoneBanner,
        componentSM: NoneBannerSM,
    },
];

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const colorSwatches = ["#535862", "#099250", "#1570EF", "#444CE7", "#6938EF", "#BA24D5", "#DD2590", "#E04F16"];

    const [customColor, setCustomColor] = useState<Color>(parseColor("#7F56D9"));
    const [color, setColor] = useState<Color>(customColor);
    const [selectedTab, setSelectedTab] = useState<string>("appearance");
    const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>("https://www.untitledui.com/logos/images/ContrastAI.jpg");

    const handleAvatarUpload = (files: FileList | null) => {
        const file = files?.[0];

        if (!file) return;

        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };

    const handleCustomColorChange = (value: Color | null) => {
        if (!value) return;

        // If the custom color is already selected, update the color.
        if (color.toString("hex") === customColor.toString("hex")) {
            setColor(value);
        }

        setCustomColor(value);
    };

    return (
        <main className="min-w-0 flex-1 bg-primary pt-8 pb-12">
            <div className="flex flex-col gap-3 md:gap-8">
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple with search */}
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-0.5">
                                <h1 className="text-xl font-semibold text-primary">Settings</h1>
                            </div>

                            {/* Desktop search input */}
                            <Input className="w-full max-w-70 max-md:hidden" size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />

                            {/* Mobile search input */}
                            <Input className="w-full md:hidden" size="md" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        </div>
                    </div>

                    <NativeSelect
                        size="sm"
                        aria-label="Page tabs"
                        className="md:hidden"
                        value={selectedTab}
                        onChange={(event) => setSelectedTab(event.target.value)}
                        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                    />

                    <div className="-mx-4 -my-1 scrollbar-hide flex overflow-auto px-4 py-1 lg:-mx-8 lg:px-8">
                        <Tabs
                            className="flex w-max items-start max-md:hidden"
                            selectedKey={selectedTab}
                            onSelectionChange={(value) => setSelectedTab(value as string)}
                        >
                            <TabList type="button-border" className="w-full" items={tabs} />
                        </Tabs>
                    </div>
                </div>
                <Form
                    className="flex flex-col gap-6 px-4 lg:px-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = Object.fromEntries(new FormData(e.currentTarget));
                        console.log("Form data:", data);
                    }}
                >
                    <SectionHeader.Root>
                        <SectionHeader.Group>
                            <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                <SectionHeader.Heading>Appearance</SectionHeader.Heading>
                                <SectionHeader.Subheading>Change how your dashboard looks and feels.</SectionHeader.Subheading>
                            </div>

                            <div className="absolute top-0 right-0 md:static">
                                <DropdownIconSimple />
                            </div>
                        </SectionHeader.Group>
                    </SectionHeader.Root>

                    {/* Form content */}
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Company logo" description="Update your company logo." />

                            <div className="flex items-center gap-5">
                                <img src={uploadedAvatar} alt="Company logo" className="size-16 rounded-2xl object-cover ring-1 ring-black/10 ring-inset" />

                                <div className="flex gap-4">
                                    <FileTrigger acceptedFileTypes={["image/*"]} onSelect={handleAvatarUpload}>
                                        <Button size="sm" color="secondary">
                                            Replace logo
                                        </Button>
                                    </FileTrigger>
                                </div>
                            </div>
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Brand color" description="Select or customize your brand color." />

                            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                <RadioGroup
                                    aria-label="Brand color"
                                    value={color?.toString("hex")}
                                    onChange={(value) => setColor(parseColor(value))}
                                    className="flex flex-col items-start gap-4 md:flex-row md:items-center"
                                >
                                    <div className="flex gap-2">
                                        {colorSwatches.map((color) => (
                                            <Radio key={color} value={color} aria-label={parseColor(color).getColorName("en-US")}>
                                                {({ isSelected, isFocused }) => (
                                                    <ColorSwatch
                                                        id={`color-${color}`}
                                                        color={color}
                                                        className={cx(
                                                            "size-7 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                            (isSelected || isFocused) && "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                        )}
                                                    />
                                                )}
                                            </Radio>
                                        ))}
                                    </div>
                                    <Radio
                                        value={customColor.toString("hex")}
                                        aria-label={customColor.getColorName("en-US")}
                                        className="flex shrink-0 items-center gap-3"
                                    >
                                        {({ isSelected, isFocused }) => (
                                            <>
                                                <label htmlFor="custom-color-input" className="text-sm font-semibold text-secondary">
                                                    Custom
                                                </label>
                                                <ColorSwatch
                                                    color={customColor}
                                                    className={cx(
                                                        "size-7 shrink-0 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                        (isSelected || isFocused) && "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                    )}
                                                />
                                                <ColorField
                                                    aria-label="Custom color"
                                                    className="md:hidden"
                                                    value={customColor}
                                                    onChange={handleCustomColorChange}
                                                >
                                                    <InputBase id="custom-color-input" size="md" wrapperClassName="w-24" />
                                                </ColorField>
                                            </>
                                        )}
                                    </Radio>
                                </RadioGroup>
                                <ColorField aria-label="Custom color" value={customColor} onChange={handleCustomColorChange} className="max-md:hidden">
                                    <InputBase size="md" wrapperClassName="w-24" />
                                </ColorField>
                            </div>
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Display preference" description="Switch between light and dark modes." />

                            <div className="-m-4 w-screen overflow-auto p-4 lg:w-[calc(100%+48px)]">
                                <RadioGroup
                                    aria-label="Display preference"
                                    value={theme ?? "system"}
                                    onChange={(value) => setTheme(String(value))}
                                    className="flex gap-5"
                                >
                                    {themes.map((item) => (
                                        <Radio key={item.value} value={item.value} aria-label={item.label} className="flex cursor-pointer flex-col gap-3">
                                            {({ isSelected, isFocusVisible }) => (
                                                <>
                                                    <section
                                                        className={cx(
                                                            "relative h-33 w-50 rounded-[10px] bg-utility-neutral-100",
                                                            isSelected && "outline-2 outline-offset-2 outline-focus-ring",
                                                        )}
                                                    >
                                                        <item.component className="size-full" />

                                                        {isSelected && (
                                                            <RadioButtonBase
                                                                size="md"
                                                                isSelected={isSelected}
                                                                isFocusVisible={isFocusVisible}
                                                                className="absolute bottom-2 left-2"
                                                            />
                                                        )}
                                                    </section>
                                                    <section className="w-full">
                                                        <p className="text-sm font-semibold text-primary">{item.label}</p>
                                                    </section>
                                                </>
                                            )}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Transparent sidebar" description="Make the sidebar transparent." />
                            <Toggle aria-label="Transparent sidebar" defaultSelected size="md" />
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Language" description="Default language for public dashboard." />

                            <div className="w-max min-w-50">
                                <Select
                                    name="language"
                                    aria-label="Language"
                                    size="md"
                                    defaultValue="en-US"
                                    items={[
                                        {
                                            id: "en-US",
                                            label: "English (US)",
                                            icon: <img src="https://www.untitledui.com/images/flags/US.svg" alt="United States flag" className="size-5" />,
                                        },
                                        {
                                            id: "de-DE",
                                            label: "German (DE)",
                                            icon: <img src="https://www.untitledui.com/images/flags/DE.svg" alt="German flag" className="size-5" />,
                                        },
                                        {
                                            id: "es-ES",
                                            label: "Spanish (ES)",
                                            icon: <img src="https://www.untitledui.com/images/flags/ES.svg" alt="Spanish flag" className="size-5" />,
                                        },
                                    ]}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </div>
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root size="sm" title="Banner appearance" description="Change how banners appear to visitors." />

                            <div className="-m-4 w-screen overflow-auto p-4 lg:w-[calc(100%+48px)]">
                                <RadioGroup aria-label="Banner appearances" defaultValue="simplified" className="flex gap-5">
                                    {banners.map((banner) => (
                                        <Radio key={banner.value} value={banner.value} aria-label={banner.label} className="flex cursor-pointer flex-col gap-3">
                                            {({ isSelected, isFocusVisible }) => (
                                                <>
                                                    <section
                                                        className={cx(
                                                            "relative h-33 w-50 rounded-[10px] bg-utility-neutral-100 before:absolute before:inset-0 before:z-10 before:rounded-[10px] before:border before:border-primary",
                                                            isSelected && "outline-2 outline-offset-2 outline-focus-ring",
                                                        )}
                                                    >
                                                        <banner.component className="size-full" />

                                                        {isSelected && (
                                                            <RadioButtonBase
                                                                size="md"
                                                                isSelected={isSelected}
                                                                isFocusVisible={isFocusVisible}
                                                                className="absolute bottom-2 left-2 z-1"
                                                            />
                                                        )}

                                                        {banner.value === "custom" && (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    iconLeading={Code02}
                                                                    color="secondary"
                                                                    className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                                                                >
                                                                    Edit CSS
                                                                </Button>
                                                                <span className="absolute top-0 left-0 size-full rounded-md bg-linear-to-b from-[rgba(0,0,0,0.02)] to-[rgba(0,0,0,0.17)] to-90% backdrop-blur-[1.875px] sm:rounded-[10px]" />
                                                            </>
                                                        )}
                                                    </section>
                                                    <section className="w-full">
                                                        <p className="text-sm font-semibold text-primary">{banner.label}</p>
                                                        <p className="text-sm text-tertiary">{banner.description}</p>
                                                    </section>
                                                </>
                                            )}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    <SectionFooter.Root>
                        <Button size="md" color="link-gray">
                            Reset <span className="max-lg:hidden"> to default</span>
                        </Button>
                        <SectionFooter.Actions>
                            <Button color="secondary" size="sm">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" size="sm">
                                Save changes
                            </Button>
                        </SectionFooter.Actions>
                    </SectionFooter.Root>
                </Form>
            </div>
        </main>
    );
}
