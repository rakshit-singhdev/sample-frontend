import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);

            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, []);

    return <div>Signing in...</div>;
};

export default OAuthSuccess;