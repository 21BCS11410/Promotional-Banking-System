const PromotionData = require('../models/promotionData');

const handlePromotion = async (req, res) => {
    try {
        const { accountNumber, introducer } = req.body;

        // Validate input
        if (!accountNumber || !introducer) {
            return res.status(400).json({
                success: false,
                message: 'Account number and introducer both are required'
            });
        }

        // Check if account number is negative
        if (parseInt(accountNumber) < 0) {
            return res.status(400).json({
                success: false,
                message: 'Account number cannot be negative'
            });
        }

        // Check if account number already exists
        const existingAccount = await PromotionData.findOne({ accountNumber });
        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: 'Account number already exists'
            });
        }

        // Find the introducer's record
        const introducerRecord = await PromotionData.findOne({ accountNumber: introducer });
            
        if(!introducerRecord && introducer !== '0'){
            return res.status(400).json({
                success: false,
                message: 'Introducer not found. Introducer must be an account holder'
            });
        }

        let beneficiary = '0'; // Default beneficiary

        // For odd account numbers
        if(accountNumber % 2 !== 0){
            console.log('odd account number');
            beneficiary = introducer;
        }
        // For even account numbers
        else {
            if(introducerRecord) {
                // If introducer exists, get their beneficiary
                console.log('even account number');
                beneficiary = introducerRecord.beneficiary;
            } else {
                // If no introducer record (shouldn't happen due to earlier check)
                beneficiary = '0';
            }
        }

        console.log('Creating record with:', {
            accountNumber,
            introducer,
            beneficiary
        });
        
        console.log('before creation');
        
        // Create new promotion record
        const newPromotion = new PromotionData({
            accountNumber,
            introducer,
            beneficiary
        });

        console.log('after creation');

        await newPromotion.save();

        return res.status(201).json({
            success: true,
            data: newPromotion,
            message: 'Promotion record created successfully'
        });

    } catch (error) {
        console.error('Error in handlePromotion:', error);
        
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate entry found. Please check your input data.',
                details: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deletePromotion = async (req, res) => {
    try {
        const { accountNumber } = req.body;

        // Validate input
        if (!accountNumber) {
            return res.status(400).json({
                success: false,
                message: 'Account number is required'
            });
        }

        // Check if account number is negative
        // if (parseInt(accountNumber) < 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Account number cannot be negative'
        //     });
        // }

        // Check if the account exists
        const existingAccount = await PromotionData.findOne({ accountNumber });
        if (!existingAccount) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        // Delete the main account entry
        const deletedAccount = await PromotionData.findOneAndDelete({ accountNumber });
        
        // Delete all entries where this account number is the introducer
        const deletedIntroducerEntries = await PromotionData.deleteMany({ introducer: accountNumber });

        console.log('Delete operation completed:', {
            deletedAccount: deletedAccount ? deletedAccount.accountNumber : null,
            deletedIntroducerEntries: deletedIntroducerEntries.deletedCount
        });

        return res.status(200).json({
            success: true,
            message: 'Account and related entries deleted successfully',
            data: {
                deletedAccount: deletedAccount,
                deletedIntroducerEntriesCount: deletedIntroducerEntries.deletedCount
            }
        });

    } catch (error) {
        console.error('Error in deletePromotion:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    handlePromotion,
    deletePromotion
}; 