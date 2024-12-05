import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleOAuthCallback, isAuthenticated } from '../services/AuthService';

const OAuthCallback = ({setIsAuthenticated}) => {
    const isProcessed = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function processOAuthResponse() {
            if (isProcessed.current) {
                return;
            }

            isProcessed.current = true;

            try {
                const currentUrl = window.location.href;
                await handleOAuthCallback(currentUrl);

                setIsAuthenticated(await isAuthenticated());
                navigate('/resources');
            } catch (error) {
                console.error('Error processing OAuth callback:', error);
            }
        }

        processOAuthResponse();
    }, [])
}

export default OAuthCallback;
