'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    description: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ 
    label, 
    icon: Icon, 
    description, 
    selected
}) => {
    const router = useRouter(); 
    const params = useSearchParams();

    const handleClick = useCallback (() => {
        router.push(`/categories/${label}`);
        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = queryString.stringifyUrl({
            url: ``,
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [router, params, label]);

    return (
        <div
            onClick={handleClick}
            className={`
                border-b-2
                p-3
                flex
                flex-col
                items-center
                justify-center
                transition
                gap-2
                hover:text-neutral-800
                cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">
                <h2>{label}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default CategoryBox;
