const ProfileOverview = () => {
    const user = {
    name: 'Kate Davydenko',
    email: 'kate@example.com',
    };

    return (
        <div>
            <h2>Інформація профілю</h2>

            <div>
                <strong>Ім’я:</strong>
                <span>{user.name}</span>
            </div>

            <div >
                <strong>Email:</strong>
                <span>{user.email}</span>
            </div>
        </div>
    );
};

export default ProfileOverview;