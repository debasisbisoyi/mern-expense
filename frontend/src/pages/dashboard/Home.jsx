import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import IncomeTransactions from "../../components/dashboard/IncomeTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import Last30DaysIncomes from "../../components/dashboard/Last30DaysIncomes";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashBoardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols1 md:grid-cols-3 gap-3">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashBoardData?.totalBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandsSeparator(dashBoardData?.totalIncome)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Expense"
            value={addThousandsSeparator(dashBoardData?.totalExpense)}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashBoardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashBoardData?.totalBalance || 0}
            totalIncome={dashBoardData?.totalIncome || 0}
            totalExpense={dashBoardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={(
              dashBoardData?.last30dExpenses?.transaction || []
            ).slice(0, 10)}
            onSeeMore={() => navigate("/expense")}
          />

          <IncomeTransactions
            transactions={(
              dashBoardData?.last30dIncomes?.transaction || []
            ).slice(0, 10)}
            onSeeMore={() => navigate("/income")}
          />

          <Last30DaysExpenses
            data={dashBoardData?.last30dExpenses?.transaction || []}
          />

          <Last30DaysIncomes
            data={dashBoardData?.last30dIncomes?.transaction || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
