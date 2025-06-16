const mongoose = require('mongoose');

// AccountNumber Schema
const promotionData = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    introducer: {
        type: String,
        required: true
    },
    beneficiary: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Drop any existing indexes
promotionData.index({ beneficiary: 1 }, { unique: false });

// Pre-save middleware for AccountNumber to update timestamp
promotionData.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('promotionData', promotionData);