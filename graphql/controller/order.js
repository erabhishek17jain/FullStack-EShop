const express = require('express');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated, isSeller, isAdmin } = require('../middleware/auth');
const Order = require('../model/order');
const Shop = require('../model/shop');
const Product = require('../model/product');

// get all orders of user
router.get(
    '/get-all-orders/:userId',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const orders = await Order.find({ 'user._id': req.params.userId }).sort({
                createdAt: -1,
            });

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// create new order
router.post(
    '/create-order',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

            //   group cart items by shopId
            const shopItemsMap = new Map();

            for (const item of cart) {
                const shopId = item.shopId;
                if (!shopItemsMap.has(shopId)) {
                    shopItemsMap.set(shopId, []);
                }
                shopItemsMap.get(shopId).push(item);
            }

            // create an order for each shop
            const orders = [];

            for (const [shopId, items] of shopItemsMap) {
                const order = await Order.create({
                    cart: items,
                    shippingAddress,
                    user,
                    totalPrice,
                    paymentInfo,
                });
                orders.push(order);
            }

            res.status(201).json({
                success: true,
                orders,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// give a refund ----- user
router.put(
    '/order-refund/:id',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler('Order not found with this id', 400));
            }

            order.status = req.body.status;
            await order.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true,
                order,
                message: 'Order Refund Request successfully!',
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

module.exports = router;
