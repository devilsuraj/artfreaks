export class logModel {
    userName: string;
    password: string;
}

export class result {
    status: number;
    message: string;
}

export class ChangePasswordViewModel {
    userName: string;
    code: string;
    password: string;
}

export class parmmode {
    date: any;
    startdate: any;
    enddate: any;
    userId: any;
    take: any;
    page: any;
    email: any;
}

export class registerModel implements logModel {
    id: string;
    email: string;
    password: string;
    fullName: string;
    confirmPassword: string;
    userName: string;
    code: string;
    mobileNumber: any;
    address: string;
    birthDate: any;
    joiningDate: any;
    salary: any;
    status: any;
    applicationId: any;
    role: any;
    gender: any;
    isApplicationOwner: boolean;
}

export class token {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
}

export class Regresult {
    succeeded: string;
    errors: any[];

}
export class forgotPassword {
    email: string;
}
