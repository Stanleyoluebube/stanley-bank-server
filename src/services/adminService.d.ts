export declare const AdminService: {
    getGlobalStats(): Promise<{
        totalUsers: any;
        totalDeposits: any;
        activeLoans: any;
        uptime: string;
    }>;
    getTransactionStream(): Promise<any[]>;
    approvePayment(transactionId: string): Promise<any>;
    declinePayment(transactionId: string): Promise<any>;
};
//# sourceMappingURL=adminService.d.ts.map