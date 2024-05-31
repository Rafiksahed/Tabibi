module.exports = (req, res) => {
    const user = req.session.user;
    if (user) {
        if (user.doctor_id) {
            userType = 'medecin';
        } else if (user.patient_id) {
            userType = 'patient';
        }
    }
    
    res.status(200).json({ success: true, userType: userType });
};
