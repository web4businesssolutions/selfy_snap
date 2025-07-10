import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Product from './Product';
import User from './User';
import Order from './Order';
import Category from './Category';
import StepperForm from './StepperProduct';
import UpdateStepperForm from './UpdateStepperProduct';
import UserPage from './UserPage';

const Main = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <Header />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path='category' element={<Category />} />
                        <Route path="product" element={<Product />} />
                        <Route path="user" element={<User />} />
                        <Route path="order" element={<Order />} />
                        <Route path="vendor" element={<UserPage />} />
                        <Route path="stepper-product" element={<StepperForm />} />
                        <Route path="stepper-product/:id" element={<UpdateStepperForm />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Main;
