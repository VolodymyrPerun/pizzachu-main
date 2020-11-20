module.exports = {
    // 400 error code
    //+
    BAD_REQUEST_BLOCK_USER: {
        message: 'User is already blocked',
        customCode: 4001
    },
    //+
    BAD_REQUEST_UNLOCK_USER: {
        message: 'User is already unlocked',
        customCode: 4002
    },
    //+
    BAD_REQUEST_USER_NOT_PRESENT: {
        message: 'User is not present',
        customCode: 4003
    },
    //+
    BAD_REQUEST_NO_TOKEN: {
        message: 'Token is not present',
        customCode: 4004
    },
    //+
    BAD_REQUEST_COMMENT_NOT_PRESENT: {
        message: 'Comment is not present',
        customCode: 4005
    },
    //+
    BAD_REQUEST_USER_ALREADY_PRESENT: {
        message: 'User is already present',
        customCode: 4006
    },
    //+
    BAD_REQUEST_SELLER_NOT_PRESENT: {
        message: 'Seller is not present',
        customCode: 4007
    },
    //+
    BAD_REQUEST_YOU_ARE_NOT_SELLER: {
        message: 'You are not a seller',
        customCode: 4008
    },
    //+
    BAD_REQUEST_ADMIN_NOT_PRESENT: {
        message: 'Admin is not present',
        customCode: 4009
    },
    //+
    BAD_REQUEST_YOU_ARE_NOT_ADMIN: {
        message: 'You are not a admin',
        customCode: 40010
    },
    BAD_REQUEST_WRONG_EMAIL: {
        message: 'Wrong email',
        customCode: 40011
    },
    BAD_REQUEST_GOOGLE_AUTH: {
        message: 'Google auth error',
        customCode: 40012
    },
    BAD_REQUEST_FACEBOOK_AUTH: {
        message: 'Facebook auth error',
        customCode: 40013
    },
    BAD_REQUEST_WRONG_PASSWORD: {
        message: 'Wrong password',
        customCode: 40014
    },
    BAD_REQUEST_USER_NOT_ACTIVE: {
        message: 'User is not active',
        customCode: 40015
    },
    BAD_REQUEST_WRONG_COUNT: {
        message: 'The count number must be greater than 0',
        customCode: 40016
    },
    //+
    BAD_REQUEST_PRODUCT_NOT_PRESENT: {
        message: 'Product is not present',
        customCode: 40015
    },
    //+
    BAD_REQUEST_PRODUCT_TYPE_NOT_PRESENT: {
        message: 'Product type is not present',
        customCode: 40016
    },
    //+
    BAD_REQUEST_PRODUCT_SECTION_NOT_PRESENT: {
        message: 'Product section is not present',
        customCode: 40017
    },
    //+
    BAD_REQUEST_PRODUCT_IS_ALREADY_PRESENT: {
        message: 'Product is already present',
        customCode: 40019
    },


    //401 error code
    UNAUTHORIZED_USER: {
        message: 'User is not authorized',
        customCode: 4011
    },
    //+
    UNAUTHORIZED_BAD_ACCESS_TOKEN: {
        message: 'Access token is not valid',
        customCode: 4012
    },
    //+
    UNAUTHORIZED_BAD_REFRESH_TOKEN: {
        message: 'Refresh token is not valid',
        customCode: 4013
    },
    //+
    UNAUTHORIZED_BAD_TOKEN: {
        message: 'Action token is not valid',
        customCode: 4014
    },



    //403 error code

    //+
    FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT: {
        message: 'Medical service is not present',
        customCode: 4031
    },

    //+
    FORBIDDEN_USER_IS_BLOCKED: {
        message: 'User is blocked',
        customCode: 4032
    },
    //+
    FORBIDDEN_PASSWORDS_NOT_MATCH: {
        message: 'Passwords do not match',
        customCode: 4033
    },
    //+
    FORBIDDEN_WRONG_ACTION_TOKEN: {
        message: 'Wrong action token',
        customCode: 4034
    },
    //+
    FORBIDDEN_NO_SPECIALITIES: {
        message: 'No specialities',
        customCode: 4035
    },
    //+
    FORBIDDEN_RECORD_NOT_PRESENT: {
        message: 'Reception record is not present',
        customCode: 4036
    },
    //+
    FORBIDDEN_PHOTO_NOT_PRESENT: {
        message: 'Photo is not present',
        customCode: 4037
    },
    //+
    FORBIDDEN_PHOTO_BIG_SIZE: {
        message: 'Photo size is more then 5mb',
        customCode: 4038
    },
    //+
    FORBIDDEN_PHOTO_COUNT: {
        message: 'You can upload only one photo',
        customCode: 4039
    }
};
