export const allquestions = [
    {
        "id":"q1",
        "type":"column2-singleselect",
        "qtext":"What describes you the best?",
        "answers":[
            {
                "label":"Dropshipping in India",
                "key":"dropshipping_in_india",
                "flowid":"f1"
            },
            {
                "label":"Dropshipping Worldwide",
                "key":"dropshipping_worldwide",
                "flowid":"f2"
            },
            {
                "label":"D2C Brand",
                "key":"d2c_brand",
                "flowid":"f3"
            },
            {
                "label":"Media Buyer / Agency",
                "key":"media_buyer_agency",
                "flowid":"f4"
            },
            {
                "label":"Creator / Influencer",
                "key":"creator_influencer",
                "flowid":"f5"
            },
            {
                "label":"I am just starting out",
                "key":"starting_out",
                "flowid":"f6"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q2",
        "type":"row2-singleselect",
        "qtext":"How do you currently dropship in India?",
        "answers":[
            {
                "label":"I use other dropshipping platforms",
                "key":"use_other_dropshipping_platforms"
            },
            {
                "label":"I source & ship products myself",
                "key":"source_ship_myself"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q3",
        "type":"column2-singleselect",
        "qtext":"How many orders do you process daily?",
        "answers":[
            {
                "label":"20-50 orders/day",
                "key":"20-50"
            },
            {
                "label":"51-100 orders/day",
                "key":"51-100"
            },
            {
                "label":"101-250 orders/day",
                "key":"101-250"
            },
            {
                "label":"251-500 orders/day",
                "key":"251-500"
            },
            {
                "label":"501-1,000 orders/day",
                "key":"501-1000"
            },
            {
                "label":"1,000+ orders/day",
                "key":"1000plus"
            },
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q4",
        "type":"column2-multiselect",
        "qtext":"What are your current challenges?",
        "answers":[
            {
                "label":"Non-exclusive, poor quality products",
                "key":"poor_quality_products"
            },
            {
                "label":"Supplier dependency",
                "key":"supplier_dependency"
            },
            {
                "label":"High competition",
                "key":"high_competition"
            },
            {
                "label":"Operational burden & in-efficiency",
                "key":"operational_burden_in-efficiency"
            },
            {
                "label":"Shipping delays & hidden charges",
                "key":"shipping_delays"
            },
            {
                "label":"Customer complaints",
                "key":"customer_complaints"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q5",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"Unique & quality products",
                "key":"unique_quality_products"
            },
            {
                "label":"Global product sourcing",
                "key":"global_product_sourcing"
            },
            {
                "label":"Custom packaging & branding",
                "key":"custom_packaging_branding"
            },
            {
                "label":"Managed operations",
                "key":"managed_operations"
            },
            {
                "label":"Fast shipping with competitive rates",
                "key":"fast_shipping_competitive_rates"
            },
            {
                "label":"Zero weight disputes",
                "key":"zero_weight_disputes"
            },
            {
                "label":"AI business insights",
                "key":"ai_insights"
            },
            {
                "label":"100% DIY Platform",
                "key":"100_diy_product"
            },
            {
                "label":"Whatsapp & IVR order confirmation",
                "key":"whatsapp_ivr"
            },
            {
                "label":"Agency ad accounts",
                "key":"agency_ad_accounts"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q6",
        "type":"column2-multiselect",
        "qtext":"Which dropshipping market do you operate in?",
        "answers":[
            {
                "label":"Worldwide, prepaid orders",
                "key":"worlwide_prepaid"
            },
            {
                "label":"Europe, COD orders",
                "key":"europe_cod"
            },
            {
                "label":"Middle East & Africa, COD orders",
                "key":"mena_cod"
            },
            {
                "label":"Other COD markets",
                "key":"other_cod"
            },
        ],
        "continuebutton":{
            "label":"Continue",
        }
    }, 
    {
        "id":"q7",
        "type":"row2-singleselect",
        "qtext":"How do you currently dropship?",
        "answers":[
            {
                "label":"I source inventory before selling",
                "key":"source_before_selling"
            },
            {
                "label":"I sell products without holding inventory",
                "key":"sell_without_holding"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q8",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"100% DIY platform (AI powered)",
                "key":"100_diy_product_ai"
            },
            {
                "label":"Managed operations",
                "key":"managed_operations"
            },
            {
                "label":"Novelty products",
                "key":"novelty_products"
            },
            {
                "label":"Global sourcing & branding",
                "key":"global_sourcing_branding"
            },
            {
                "label":"International payouts",
                "key":"international_payouts"
            },
            {
                "label":"Local tax handling",
                "key":"local_tax"
            },
            {
                "label":"Call center services",
                "key":"call_center"
            },
            {
                "label":"Market entry support",
                "key":"market_entry"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q9",
        "type":"row2-singleselect",
        "qtext":"Do you have operations in India?",
        "ftype":"multiflow",
        "answers":[
            {
                "label":"Yes",
                "key":"yes",
                "nextq":"q10",
            },
            {
                "label":"No",
                "key":"no",
                "nextq":"q11"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q10",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "prevq":"q9",
        "answers":[
            {
                "label":"Unique & quality products",
                "key":"unique_quality_products"
            },
            {
                "label":"Global product sourcing",
                "key":"global_product_sourcing"
            },
            {
                "label":"Custom packaging & branding",
                "key":"custom_packaging_branding"
            },
            {
                "label":"100% DIY platform",
                "key":"100_diy_product"
            },
            {
                "label":"Managed operations",
                "key":"managed_operations"
            },
            {
                "label":"AI business insights",
                "key":"ai_insights"
            },
            {
                "label":"Call center services",
                "key":"call_center"
            },
            {
                "label":"Agency ad accounts",
                "key":"agency_ad_accounts"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q11",
        "type":"column2-multiselect",
        "final":true,
        "prevq":"q9",
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"Expand your brand in India",
                "key":"expand_india"
            },
            {
                "label":"Localized product sourcing",
                "key":"local_sourcing"
            },
            {
                "label":"100% DIY platform (AI powered)",
                "key":"100_diy_product"
            },
            {
                "label":"Managed operations",
                "key":"managed_operations"
            },
            {
                "label":"International payouts",
                "key":"international_payouts"
            },
            {
                "label":"Local tax handling",
                "key":"local_tax"
            },
            {
                "label":"Call center services",
                "key":"call_center"
            },
            {
                "label":"Market entry support",
                "key":"market_entry"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q12",
        "type":"row2-singleselect",
        "qtext":"What is your eCommerce experience level?",
        "byline":"Your choices here won’t limit what you can do with vFulfill.",
        "answers":[
            {
                "label":"Beginner",
                "key":"beginner",
                "byline":"I am just starting out"
            },
            {
                "label":"Intermediate",
                "key":"intermediate",
                "byline":"I have some experience in media buying for eCommerce businesses"
            },
            {
                "label":"Advanced",
                "key":"advanced",
                "byline":"I actively handle media buying for eCommerce businesses"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q13",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"100% DIY platform",
                "key":"100_diy_product"
            },
            {
                "label":"Managed eCommerce operations",
                "key":"manage_ecommerce_operations"
            },
            {
                "label":"Novelty products",
                "key":"novelty_products"
            },
            {
                "label":"Global sourcing",
                "key":"global_sourcing"
            },
            {
                "label":"Custom packaging & branding",
                "key":"custom_packaging_branding"
            },
            {
                "label":"AI business insights",
                "key":"ai_insights"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q14",
        "type":"row2-singleselect",
        "qtext":"What is your eCommerce experience level?",
        "byline":"Your choices here won’t limit what you can do with vFulfill.",
        "answers":[
            {
                "label":"Beginner",
                "key":"beginner",
                "byline":"I am just starting out"
            },
            {
                "label":"Intermediate",
                "key":"intermediate",
                "byline":"I have some experience eCommerce"
            },
            {
                "label":"Advanced",
                "key":"advanced",
                "byline":"I run an eCommerce business already"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q15",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"Unique & quality products",
                "key":"unique_quality_products"
            },
            {
                "label":"Global product sourcing",
                "key":"global_product_sourcing"
            },
            {
                "label":"Custom packaging & branding",
                "key":"custom_packaging_branding"
            },
            {
                "label":"100% DIY platform",
                "key":"100_diy_product"
            },
            {
                "label":"Managed eCommerce operations",
                "key":"manage_ecommerce_operations"
            },
            {
                "label":"AI business insights",
                "key":"ai_insights"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    },
    {
        "id":"q16",
        "type":"column2-multiselect",
        "final":true,
        "qtext":"What are you most interested in?",
        "answers":[
            {
                "label":"Educational resources",
                "key":"educational_resources"
            },
            {
                "label":"Low competition products",
                "key":"low_competition_products"
            },
            {
                "label":"Global sourcing & branding",
                "key":"global_sourcing_branding"
            },
            {
                "label":"100% DIY platform",
                "key":"100_diy_product"
            },
            {
                "label":"Managed eCommerce operations",
                "key":"manage_ecommerce_operations"
            },
            {
                "label":"AI business insights",
                "key":"ai_business_insighai_insights"
            }
        ],
        "continuebutton":{
            "label":"Continue",
        }
    }
];
