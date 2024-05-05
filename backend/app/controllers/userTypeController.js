// userTypeController.js

module.exports = (req, res) => {
    const user = req.session.user;
    if (user) {
        let userType = '';
        if (user.doctor_id) {
            userType = 'medecin';
        } else if (user.patient_id) {
            userType = 'patient';
        }
        res.status(200).json({ success: true, userType: userType });
    } else {
        // Si aucune session utilisateur n'est trouvée, renvoie un type par défaut (par exemple, 'public')
        res.status(200).json({ success: true, userType: 'public' });
    }
};
