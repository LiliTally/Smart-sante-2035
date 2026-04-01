// Badge de niveau de triage
import { TRIAGE_LEVELS } from '../utils/triageLevels';

export default function TriageBadge({ level }) {
  const lvl = TRIAGE_LEVELS[level] || TRIAGE_LEVELS.LEGER;
  return (
    <span className={`badge ${lvl.bg} ${lvl.text}`} title={lvl.description}>
      {lvl.name}
    </span>
  );
}
