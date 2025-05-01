import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, X, Users, User, Search, Calendar, Briefcase, Paperclip, File, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Opportunity } from '../services/opportunity.service';
import { Textarea } from '@/components/ui/textarea';
import { Team, teamService } from '../services/team.service';
import { useApplication } from '../hooks/useApplication';

interface ContactProps {
  opportunity: Opportunity;
}

const Contact = ({ opportunity }: ContactProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    proposal,
    isSubmitting,
    isTeamApplication,
    searchQuery,
    allTeams,
    filteredTeams,
    selectedTeam,
    isLoading,
    selectedFile,
    setProposal,
    setIsTeamApplication,
    setSearchQuery,
    setAllTeams,
    setFilteredTeams,
    setIsLoading,
    handleSubmit,
    handleTeamSelect,
    resetTeamSelection,
    handleFileSelect,
  } = useApplication({ opportunity });

  // Fetch all teams when team application mode is enabled
  useEffect(() => {
    const fetchTeams = async () => {
      if (!isTeamApplication) return;
      
      setIsLoading(true);
      try {
        const teams = await teamService.getAllTeams();
        console.log('Fetched teams:', teams); // Debug log
        setAllTeams(teams);
        setFilteredTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isTeamApplication) {
      fetchTeams();
    }
  }, [isTeamApplication]);

  // Handle local search
  useEffect(() => {
    if (!isTeamApplication) return;
    
    const searchResults = teamService.searchTeams(allTeams, searchQuery);
    setFilteredTeams(searchResults);
  }, [searchQuery, allTeams, isTeamApplication]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-lg bg-white p-6 shadow-sm !border-none !bg-white">
        <h2 className="mb-4 text-xl font-semibold text-black">Contact the Organisers</h2>
        <p className="mb-4 text-black">
          Interested in this opportunity? Click the button below to apply directly.
        </p>

        {/* Application Type Toggle */}
        <div className="flex gap-4 mb-6">
          <Button
            type="button"
            onClick={resetTeamSelection}
            className={`flex items-center gap-2 ${!isTeamApplication ? 'bg-[#65C97A] text-white' : 'bg-gray-100 text-black'}`}
          >
            <User className="h-4 w-4" />
            Individual
          </Button>
          <Button
            type="button"
            onClick={() => setIsTeamApplication(true)}
            className={`flex items-center gap-2 ${isTeamApplication ? 'bg-[#65C97A] text-white' : 'bg-gray-100 text-black'}`}
          >
            <Users className="h-4 w-4" />
            Team
          </Button>
        </div>

        <div className="space-y-4">
          {/* Team Selection Section */}
          {isTeamApplication && (
            <div className="space-y-4 mb-4">
              <h3 className="text-lg font-medium text-black">Select Your Team</h3>
              
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pr-10 border rounded-md placeholder:text-black/30 !border-none !bg-white !text-black !shadow-sm focus-visible:ring-0 focus-visible:!ring-offset-0"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Team List */}
              {searchQuery && !isLoading && filteredTeams.length > 0 && (
                <div className="max-h-48 overflow-y-auto border rounded-md shadow-sm">
                  {filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleTeamSelect(team)}
                      className="w-full p-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-black">{team.name}</span>
                        <span className="text-sm text-gray-500 ">
                          {team.students.length} member{team.students.length !== 1 ? 's' : ''} • {team.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Team Display */}
              {selectedTeam && (
                <div className="p-4 bg-gray-50 rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg text-black">{selectedTeam.name}</span>
                    <Button
                      type="button"
                      onClick={() => handleTeamSelect(null)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-black/80 ">Team Leader: {selectedTeam.leader.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-black/80 ">Created: {formatDate(selectedTeam.createdate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-black/80 ">Category: {selectedTeam.category}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-1">Team Members ({selectedTeam.students.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeam.students.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 bg-white p-2 rounded-md"
                        >
                          {member.profilepic ? (
                            <img
                              src={member.profilepic}
                              alt={member.name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <User className="w-6 h-6 p-1 rounded-full bg-gray-100" />
                          )}
                          <span className="text-sm text-black/80">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="text-center text-gray-500">
                  Loading teams...
                </div>
              )}

              {!isLoading && searchQuery && filteredTeams.length === 0 && (
                <div className="text-center text-gray-500">
                  No teams found
                </div>
              )}
            </div>
          )}

          {/* Proposal Textarea */}
          <Textarea
            placeholder="Write your proposal here..."
            className="min-h-[200px] w-full p-4 border rounded-lg resize-none placeholder:text-black/30 !border-none !bg-white !text-black !shadow-sm focus-visible:ring-0 focus-visible:!ring-offset-0"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            disabled={isSubmitting}
          />

          {/* File Upload Section */}
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            
            {selectedFile ? (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <File className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileSelect(null)}
                  className="text-gray-500 hover:!bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500 hover:bg-red-500 " />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={handleFileButtonClick}
                className="w-full  p-4 flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-700 !bg-white !border-none !shadow-sm"
                disabled={isSubmitting}
              >
                <Paperclip className="h-4 w-4" />
                <span className="text-black">Attach Resume/CV (Optional)</span>
              </Button>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX (max 5MB)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (isTeamApplication && !selectedTeam)}
            className="w-full bg-[#65C97A] hover:bg-[#52B86A] text-white flex items-center gap-2 justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Apply {isTeamApplication ? 'as Team' : 'Now'}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
