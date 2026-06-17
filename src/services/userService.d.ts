export declare const UserService: {
    createUser(email: string, pass: string): Promise<any>;
    authenticateUser(email: string, pass: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
        };
    } | null>;
    getBalance(userId: number): Promise<any>;
    getTransactions(userId: number): Promise<any[]>;
};
//# sourceMappingURL=userService.d.ts.map