exports.getTest = async (req, res) => {
    res.Status(200).json({
        message: "Test API Works",
    });
};