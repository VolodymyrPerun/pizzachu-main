module.exports = {
    // 400 error code
    //+
    BAD_REQUEST_BLOCK_USER: {
        message: 'User is already blocked',
        code: 4001
    },
    //+
    BAD_REQUEST_UNLOCK_USER: {
        message: 'User is already unlocked',
        code: 4002
    },
    //+
    BAD_REQUEST_USER_NOT_PRESENT: {
        message: 'User is not present',
        code: 4003
    },
    //+
    BAD_REQUEST_NO_TOKEN: {
        message: 'Token is not present',
        code: 4004
    },
    //+
    BAD_REQUEST_COMMENT_NOT_PRESENT: {
        message: 'Comment is not present',
        code: 4005
    },
    //+
    BAD_REQUEST_USER_ALREADY_PRESENT: {
        message: 'User is already present',
        code: 4006
    },
    //+
    BAD_REQUEST_DOCTOR_NOT_PRESENT: {
        message: 'Doctor is not present',
        code: 4007
    },
    //+
    BAD_REQUEST_YOU_ARE_NOT_DOCTOR: {
        message: 'You are not a doctor',
        code: 4008
    },
    //+
    BAD_REQUEST_ADMIN_NOT_PRESENT: {
        message: 'Admin is not present',
        code: 4009
    },
    //+
    BAD_REQUEST_YOU_ARE_NOT_ADMIN: {
        message: 'You are not a admin',
        code: 40010
    },
    BAD_REQUEST_WRONG_EMAIL: {
        message: 'Wrong email',
        code: 40011
    },
    BAD_REQUEST_GOOGLE_AUTH: {
        message: 'Google auth error',
        code: 40012
    },
    BAD_REQUEST_FACEBOOK_AUTH: {
        message: 'Facebook auth error',
        code: 40013
    },
    BAD_REQUEST_WRONG_PASSWORD: {
        message: 'Wrong password',
        code: 40014
    },


    //401 error code
    UNAUTHORIZED_USER: {
        message: 'User is not authorized',
        code: 4011
    },
    //+
    UNAUTHORIZED_BAD_ACCESS_TOKEN: {
        message: 'Access token is not valid',
        code: 4012
    },
    //+
    UNAUTHORIZED_BAD_REFRESH_TOKEN: {
        message: 'Refresh token is not valid',
        code: 4013
    },
    //+
    UNAUTHORIZED_BAD_TOKEN: {
        message: 'Action token is not valid',
        code: 4014
    },


    //403 error code

    //+
    FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT: {
        message: 'Medical service is not present',
        code: 4031
    },

    //+
    FORBIDDEN_USER_IS_BLOCKED: {
        message: 'User is blocked',
        code: 4032
    },
    //+
    FORBIDDEN_PASSWORDS_NOT_MATCH: {
        message: 'Passwords do not match',
        code: 4033
    },
    //+
    FORBIDDEN_WRONG_ACTION_TOKEN: {
        message: 'Wrong action token',
        code: 4034
    },
    //+
    FORBIDDEN_NO_SPECIALITIES: {
        message: 'No specialities',
        code: 4035
    },
    //+
    FORBIDDEN_RECORD_NOT_PRESENT: {
        message: 'Reception record is not present',
        code: 4036
    },
    //+
    FORBIDDEN_PHOTO_NOT_PRESENT: {
        message: 'Photo is not present',
        code: 4037
    },
    //+
    FORBIDDEN_PHOTO_BIG_SIZE: {
        message: 'Photo size is more then 5mb',
        code: 4038
    },
    //+
    FORBIDDEN_PHOTO_COUNT: {
        message: 'You can upload only one photo',
        code: 4039
    }
};
