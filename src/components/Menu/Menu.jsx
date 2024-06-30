"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
            const data = await res.json();
            setCategories(data);
        };

        // Cargar estado de categorías expandidas desde localStorage
        const savedState = JSON.parse(localStorage.getItem('expandedCategories')) || {};
        setExpandedCategories(savedState);

        fetchCategories();
    }, []);

    useEffect(() => {
        // Guardar estado de categorías expandidas en localStorage
        localStorage.setItem('expandedCategories', JSON.stringify(expandedCategories));
    }, [expandedCategories]);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    return (
        <aside className="sidebar">
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <div className="category-header">
                            <button onClick={() => toggleCategory(category.id)}>
                                {expandedCategories[category.id] ? '-' : '+'}
                            </button>
                            <Link href={`/${category.id}`}>
                                <span>{category.name}</span>
                            </Link>
                        </div>
                        {expandedCategories[category.id] && category.children_categories && (
                            <ul>
                                {category.children_categories.map((subCategory) => (
                                    <li key={subCategory.id}>
                                        <Link href={`/${subCategory.id}`}>
                                            {subCategory.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Menu;
