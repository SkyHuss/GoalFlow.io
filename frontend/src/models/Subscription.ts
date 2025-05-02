import { DateTime } from "luxon";

export enum SubscriptionPlan {
    Free = 'Free plan',
    Premium = 'Premium plan',
    Company = 'Company plan'
}

export interface UserPlan {
    type: SubscriptionPlan,
    startDate: DateTime,
    billingDate: DateTime,
    status: boolean,
}