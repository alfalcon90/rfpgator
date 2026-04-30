"use client";

import { useCallback, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronDown, FilterLines, SearchLg } from "@untitledui/icons";
import type { Key } from "react-aria-components";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { CountBadge, FilterDropdown, type FilterRow } from "./filter-dropdown-menu";

const statusItems = [
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
];

const categoryItems = [
    { id: "all", label: "View all" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
];

const sortItems = [
    { id: "descending", label: "Descending" },
    { id: "ascending", label: "Ascending" },
];

const teamItems = [
    { id: "engineering", label: "Engineering" },
    { id: "design", label: "Design" },
    { id: "product", label: "Product" },
    { id: "marketing", label: "Marketing" },
];

const periodItems = [
    { id: "7-days", label: "Last 7 days" },
    { id: "14-days", label: "Last 14 days" },
    { id: "30-days", label: "Last 30 days" },
    { id: "90-days", label: "Last 90 days" },
];

const filterFieldItems = [
    { id: "status", label: "Status" },
    { id: "email", label: "Email" },
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
];

const operatorItems = [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "does-not-contain", label: "Does not contain" },
    { id: "starts-with", label: "Starts with" },
];

const viewTabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

const now = today(getLocalTimeZone());

const yearRange = {
    start: now,
    end: now.add({ years: 1 }),
};

const weekRange = {
    start: now,
    end: now.add({ days: 6 }),
};

let nextFilterId = 1;
const createEmptyFilter = (): FilterRow => ({
    id: String(nextFilterId++),
    field: "",
    operator: "equals",
    value: "",
});

export const renderFilterRow = (filter: FilterRow, onChange: (patch: Partial<Omit<FilterRow, "id">>) => void) => (
    <>
        <Select
            className="max-w-40 flex-1"
            size="sm"
            aria-label="Filter field"
            placeholder="Select filter"
            items={filterFieldItems}
            value={filter.field || null}
            onChange={(key) => onChange({ field: String(key) })}
        >
            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
        <Select
            className="max-w-40 flex-1"
            size="sm"
            aria-label="Operator"
            placeholder="Operator"
            items={operatorItems}
            value={filter.operator || null}
            onChange={(key) => onChange({ operator: String(key) })}
        >
            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
        <Input
            className="min-w-0 flex-1"
            size="sm"
            aria-label="Value"
            placeholder="Enter a value"
            value={filter.value}
            onChange={(value) => onChange({ value })}
        />
    </>
);

export function useFilterState(initial: FilterRow[] = []) {
    const [filters, setFilters] = useState<FilterRow[]>(initial);
    const [appliedCount, setAppliedCount] = useState(initial.filter((f) => f.field && f.value).length);

    const onAddFilter = useCallback(() => setFilters((prev) => [...prev, createEmptyFilter()]), []);
    const onRemoveFilter = useCallback((id: string) => setFilters((prev) => prev.filter((f) => f.id !== id)), []);
    const onFilterChange = useCallback(
        (id: string, patch: Partial<Omit<FilterRow, "id">>) => setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f))),
        [],
    );
    const onApply = useCallback((applied: FilterRow[]) => setAppliedCount(applied.filter((f) => f.field && f.value).length), []);
    const onClearAll = useCallback(() => {
        setFilters([]);
        setAppliedCount(0);
    }, []);

    return { filters, appliedCount, onAddFilter, onRemoveFilter, onFilterChange, onApply, onClearAll };
}

export const FilterBarSimpleDemo = () => {
    const filterState = useFilterState();

    return (
        <div className="flex flex-wrap gap-3">
            <Input shortcut className="min-w-0 flex-1 sm:max-w-70" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
            <div className="flex shrink-0 items-center gap-3">
                <DateRangePicker aria-label="Select dates" size="sm" className="max-md:hidden" />
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow} />
            </div>
        </div>
    );
};

export const FilterBarTabsAndSearchDemo = () => {
    const [selectedTab, setSelectedTab] = useState<Key>("all");
    const filterState = useFilterState();

    return (
        <div className="flex flex-wrap gap-3 max-md:flex-col">
            <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} className="w-auto">
                <TabList size="sm" type="button-minimal" items={viewTabs} />
            </Tabs>
            <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                <Input shortcut className="min-w-0 max-md:flex-1 md:w-70" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                {/* Mobile: icon-only */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} className="max-h-9 md:hidden" />
                </FilterDropdown>
                {/* Desktop: icon + label */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button
                        aria-label="Filters"
                        color="secondary"
                        size="sm"
                        iconLeading={FilterLines}
                        className={cx("max-h-9 max-md:hidden", filterState.appliedCount > 0 && "bg-primary_hover")}
                    >
                        <span className="flex items-center gap-1.5">
                            Filters
                            {filterState.appliedCount > 0 && <CountBadge count={filterState.appliedCount} />}
                        </span>
                    </Button>
                </FilterDropdown>
            </div>
        </div>
    );
};

export const FilterBarTabsAndDatePickerDemo = () => {
    const [selectedTab, setSelectedTab] = useState<Key>("12-months");
    const filterState = useFilterState();

    return (
        <div className="flex flex-wrap gap-3">
            <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} className="w-auto">
                <TabList size="sm" type="button-minimal">
                    <Tabs.Item id="12-months">
                        <span className="max-md:hidden">12 months</span>
                        <span className="md:hidden">12m</span>
                    </Tabs.Item>
                    <Tabs.Item id="30-days">
                        <span className="max-md:hidden">30 days</span>
                        <span className="md:hidden">30d</span>
                    </Tabs.Item>
                    <Tabs.Item id="7-days">
                        <span className="max-md:hidden">7 days</span>
                        <span className="md:hidden">7d</span>
                    </Tabs.Item>
                    <Tabs.Item id="24-hours">
                        <span className="max-md:hidden">24 hours</span>
                        <span className="md:hidden">24h</span>
                    </Tabs.Item>
                </TabList>
            </Tabs>
            <div className="ml-auto flex shrink-0 items-center gap-3">
                <DateRangePicker size="sm" aria-label="Date range" defaultValue={yearRange} className="max-md:hidden" />
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button
                        aria-label="Filters"
                        color="secondary"
                        size="sm"
                        iconLeading={FilterLines}
                        className={cx("max-h-9", filterState.appliedCount > 0 && "bg-primary_hover")}
                    >
                        <span className="flex items-center gap-1.5">
                            Filters
                            {filterState.appliedCount > 0 && <CountBadge count={filterState.appliedCount} />}
                        </span>
                    </Button>
                </FilterDropdown>
            </div>
        </div>
    );
};

export const FilterBarDateFiltersDemo = () => {
    const filterState = useFilterState();

    return (
        <div className="flex flex-wrap gap-3 max-md:flex-col">
            <div className="flex min-w-0 flex-1 flex-wrap gap-3">
                <Button color="secondary" size="sm" className="max-lg:hidden">
                    Today
                </Button>
                <Select className="w-32 max-lg:hidden" size="sm" aria-label="Period" placeholder="Select period" items={periodItems} defaultValue="7-days">
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <DateRangePicker size="sm" aria-label="Date range" defaultValue={weekRange} />
            </div>
            <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                <Input shortcut className="min-w-0 max-md:flex-1 md:w-70" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                {/* Mobile: icon-only */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} className="max-h-9 md:hidden" />
                </FilterDropdown>
                {/* Desktop: icon + label */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button
                        aria-label="Filters"
                        color="secondary"
                        size="sm"
                        iconLeading={FilterLines}
                        iconTrailing={() => <ChevronDown data-icon="trailing" className="size-4! stroke-[2.25px]!" />}
                        className={cx("max-h-9 max-md:hidden", filterState.appliedCount > 0 && "bg-primary_hover")}
                    >
                        <span className="flex items-center gap-1.5">
                            Filters
                            {filterState.appliedCount > 0 && <CountBadge count={filterState.appliedCount} />}
                        </span>
                    </Button>
                </FilterDropdown>
            </div>
        </div>
    );
};

export const FilterBarDropdownsDemo = () => (
    <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-0 flex-1 gap-3 max-md:flex-col">
            <Input
                className="w-full min-w-0 max-md:**:data-label:hidden md:max-w-70"
                size="sm"
                label="Search for order"
                aria-label="Search for order"
                placeholder="Search"
                icon={SearchLg}
            />
            <div className="flex min-w-0 flex-1 gap-3">
                <Select
                    className="w-full max-md:**:data-label:hidden md:max-w-40"
                    size="sm"
                    label="Status"
                    aria-label="Status"
                    placeholder="Select"
                    items={statusItems}
                    defaultValue="paid"
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select
                    className="w-full max-md:**:data-label:hidden md:max-w-40"
                    size="sm"
                    label="Category"
                    aria-label="Category"
                    placeholder="Select"
                    items={categoryItems}
                    defaultValue="all"
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <CloseButton size="sm" className="-ml-2 md:hidden" />
            </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 max-md:hidden">
            <Button color="secondary" size="sm">
                Clear all
            </Button>
        </div>
    </div>
);

export const FilterBarDropdownsAndDatePickerDemo = () => {
    const filterState = useFilterState();

    return (
        <div className="flex flex-wrap items-end gap-3">
            <div className="hidden min-w-0 flex-1 items-end gap-3 lg:flex">
                <Select
                    className="w-full max-w-40"
                    size="sm"
                    label="Sort by"
                    aria-label="Sort by"
                    placeholder="Select"
                    items={sortItems}
                    defaultValue="descending"
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select className="w-full max-w-40" size="sm" label="Status" aria-label="Status" placeholder="Select" items={statusItems} defaultValue="paid">
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select className="w-full max-w-40" size="sm" label="Teams" aria-label="Teams" placeholder="Select teams" items={teamItems}>
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Button color="secondary" size="sm">
                    Clear all
                </Button>
            </div>
            <div className="flex shrink-0 items-center gap-3 max-lg:w-full">
                <DateRangePicker size="sm" aria-label="Date range" defaultValue={weekRange} className="max-lg:mr-auto" />
                {/* Mobile: icon-only */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} className="max-h-9 md:hidden" />
                </FilterDropdown>
                {/* Desktop: icon + label */}
                <FilterDropdown {...filterState} renderFilterRow={renderFilterRow}>
                    <Button
                        aria-label="Filters"
                        color="secondary"
                        size="sm"
                        iconLeading={FilterLines}
                        className={cx("max-h-9 max-md:hidden", filterState.appliedCount > 0 && "bg-primary_hover")}
                    >
                        <span className="flex items-center gap-1.5">
                            Filters
                            {filterState.appliedCount > 0 && <CountBadge count={filterState.appliedCount} />}
                        </span>
                    </Button>
                </FilterDropdown>
                <Button aria-label="Search" color="secondary" size="sm" iconLeading={SearchLg} />
            </div>
        </div>
    );
};

export const FilterBarAdvancedInactiveDemo = () => (
    <div className="flex flex-wrap gap-3">
        <div className="hidden min-w-0 flex-1 flex-wrap gap-3 md:flex">
            <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} />

            <div className="flex items-center gap-1">
                <div className="flex items-center gap-3">
                    <Select className="w-28" size="sm" aria-label="Filter field" placeholder="Filter" items={filterFieldItems}>
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    <Select className="w-28" size="sm" aria-label="Operator" placeholder="Operator" items={operatorItems} defaultValue="equals">
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    <Input className="w-42" size="sm" aria-label="Value" placeholder="Enter a value" />
                </div>

                <CloseButton aria-label="Remove filter" size="sm" />
            </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 max-md:w-full">
            <Button color="secondary" size="sm" className="max-md:hidden">
                Clear all
            </Button>
            <Button color="secondary" size="sm" iconLeading={FilterLines} className="w-full text-center md:hidden">
                Apply filters
            </Button>
        </div>
    </div>
);

export const FilterBarAdvancedActiveDemo = () => {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="hidden min-w-0 flex-1 flex-wrap gap-3 md:flex">
                <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} />

                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-3">
                        <Select className="w-28" size="sm" aria-label="Filter field" placeholder="Filter" items={filterFieldItems} defaultValue="status">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Select className="w-28" size="sm" aria-label="Operator" placeholder="Operator" items={operatorItems} defaultValue="equals">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Input className="w-42" size="sm" aria-label="Value" placeholder="Enter a value" defaultValue="Active" />
                    </div>

                    <CloseButton aria-label="Remove filter" size="sm" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-3">
                        <Select className="w-28" size="sm" aria-label="Filter field" placeholder="Filter" items={filterFieldItems} defaultValue="email">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Select className="w-28" size="sm" aria-label="Operator" placeholder="Operator" items={operatorItems} defaultValue="contains">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Input className="w-42" size="sm" aria-label="Value" placeholder="Enter a value" defaultValue="gmail" />
                    </div>

                    <CloseButton aria-label="Remove filter" size="sm" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-3">
                        <Select className="w-28" size="sm" aria-label="Filter field" placeholder="Filter" items={filterFieldItems} defaultValue="team">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Select className="w-28" size="sm" aria-label="Operator" placeholder="Operator" items={operatorItems} defaultValue="does-not-contain">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Input className="w-42" size="sm" aria-label="Value" placeholder="Enter a value" defaultValue="gmail" />
                    </div>
                    <CloseButton aria-label="Remove filter" size="sm" />
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                <Button color="secondary" size="sm" className="max-md:hidden">
                    Clear all
                </Button>
                <Button color="secondary" size="sm" iconLeading={FilterLines} className="w-full text-center md:hidden">
                    Edit filters
                </Button>
            </div>
        </div>
    );
};
