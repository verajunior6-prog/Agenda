import DailyPanel from './components/DailyPanel';
import TaskBoard from './components/TaskBoard';
import WritingSection from './components/WritingSection';
import HabitsTracker from './components/HabitsTracker';
import FinanceSnapshot from './components/FinanceSnapshot';
import WeeklyPlanning from './components/WeeklyPlanning';
import WeeklyReview from './components/WeeklyReview';

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <DailyPanel />
      <TaskBoard />
      <WritingSection />
      <HabitsTracker />
      <FinanceSnapshot />
      <WeeklyPlanning />
      <WeeklyReview />
    </div>
  );
}
