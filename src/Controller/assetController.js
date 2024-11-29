const Assets = require('../models/assetModel');

const assetController = {
    getAllAssets: async (req, res) => {
        try {
            const assets = await Assets.find();
            res.status(200).json(assets);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAssetById: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            res.status(200).json(asset);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createAsset: async (req, res) => {
        try {
            const asset = await Assets.create({
                asset_id: req.params.id,
                asset_code: req.body.assetCode,
                asset_name: req.body.assetName,
                specifications: req.body.specifications,
                year_of_use: req.body.yearOfUse,
                quantity: req.body.quantity,
                unit_price: req.body.unitPrice,
                origin_price: req.body.originPrice,
                real_count: req.body.realCount,
                depreciation_rate: req.body.depreciationRate,
                remaining_value: req.body.remainingValue,
                location: req.body.location,
                assetValue: req.body.assetValue,
            });
            res.status(200).json(asset);
        } catch (err) {
            res.status(500).json(err);
        }
    },    
    updateAsset: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            if (asset.asset_id=== req.body.asset_id) {
                await asset.updateOne({ $set: req.body });
                res.status(200).json("Asset has been updated");
            } else {
                res.status(403).json("You can update only your asset");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAsset: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            if (asset.assetName === req.body.assetName) {
                await asset.deleteOne();
                res.status(200).json("Asset has been deleted");
            } else {
                res.status(403).json("You can delete only your asset");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllAssetsByUser: async (req, res) => {
        try {
            const assets = await Assets.find({ responsible_user: req.params.responsible_user });
            res.status(200).json(assets);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createHistory: async (req, res) => {
        try {
            const asset = await new HistoryItemSchema({
                date: req.body.date,
                real_count: req.body.real_count,
                Difference: req.body.Difference,
            });
            res.status(200).json("History has been updated");
        } catch (err) {
            res.status(500).json(err);
        }
    },
   
}

module.exports = assetController;