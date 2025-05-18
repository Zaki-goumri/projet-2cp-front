import {
  Building,
  Calendar,
  MapPin,
  FileText,
  Link as LinkIcon,
  Users,
  Clock,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { Application } from '../types/application.types';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onDelete?: (id: number) => void;
}

const StatusBadge = ({ status }: { status: Application['status'] }) => {
  const statusConfig = {
    under_review: {
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      label: 'Under Review',
    },
    accepted: {
      color: 'bg-green-50 text-green-700 border-green-200',
      label: 'Accepted',
    },
    rejected: {
      color: 'bg-red-50 text-red-700 border-red-200',
      label: 'Rejected',
    },
    pending: {
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      label: 'Pending',
    },
    submitted:{
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'submitted',
    }

  };
console.log(status)
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config?.color}
`}
    >
      {config.label}
    </span>
  );
};

export const ApplicationCard = ({ application, onDelete }: ApplicationCardProps) => {
  const { post } = application;
  const submittedDate = new Date(post.created_at);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 group-hover:text-primary line-clamp-1">
            {post.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Building className="mr-1.5 h-4 w-4" />
              {post.company.name}
            </span>
            <span className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4" />
              {post.worktype}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={application.status} />
          {onDelete && (
            <button
              className="mt-2 rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
              title="Delete Application"
              onClick={() => onDelete(application.id)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 text-sm font-medium text-gray-700">Your Proposal</h4>
          <p className="text-sm text-gray-600 line-clamp-3">{application.proposal}</p>
        </div>

        {application.team && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="mr-2 h-4 w-4 text-gray-400" />
            Team: {application.team.name}
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {application.atachedfile && (
            <a
              href={application.atachedfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary"
            >
              <FileText className="mr-1.5 h-4 w-4" />
              View Attachment
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
          {application.links && (
            <a
              href={application.links}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary"
            >
              <LinkIcon className="mr-1.5 h-4 w-4" />
              Additional Links
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="mr-1.5 h-4 w-4" />
          Submitted {formatDistanceToNow(submittedDate, { addSuffix: true })}
        </div>
        {post.enddate && (
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            Due by {new Date(post.enddate).toLocaleDateString()}
          </div>
        )}
      </div>

      {post.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard; 