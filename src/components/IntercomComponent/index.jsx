import React from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useSelector } from "react-redux";

export function IntercomComponent() {
    const auth = useSelector((state) => state.auth);
    const user = auth.auth.user
    Intercom({
        app_id: 'sm08dgcp',
        user_id: user.numid, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
        name: user.user_fname, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
        email: user.user_email, // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email
        created_at: user.user_created, // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date in a Unix timestamp (in seconds) e.g. 1704067200
    });
}