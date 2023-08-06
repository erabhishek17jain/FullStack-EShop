import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server';
import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const AllProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/product/admin-all-products`, { withCredentials: true }).then((res) => {
            setData(res.data.products);
        });
    }, []);

    const columns = [
        { field: 'id', headerName: 'Product Id', minWidth: 150, flex: 0.7 },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: 'price',
            headerName: 'Price',
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: 'Stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 80,
            flex: 0.5,
        },

        {
            field: 'sold',
            headerName: 'Sold out',
            type: 'number',
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: 'Preview',
            flex: 0.8,
            minWidth: 100,
            headerName: '',
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    data &&
        data.forEach((item) => {
            row.push({
                id: item._id,
                name: item.name,
                price: '&#8377; ' + item.discountPrice,
                Stock: item.stock,
                sold: item?.sold_out,
            });
        });

    return (
        <div className='w-full flex justify-center pt-5'>
            <div className='w-[97%]'>
                <h3 className='text-[22px] font-Poppins pb-2'>All Products</h3>
                <div className='w-full bg-white rounded'>
                    <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
