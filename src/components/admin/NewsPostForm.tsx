import React, { useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  Upload,
  Calendar,
  Sparkles
} from 'lucide-react';
import { MediaType, NewsItem, SentimentType, PostStatus } from '../../types';

interface NewsPostFormProps {
  initialData?: NewsItem | null;
  onSubmit: (data: Partial<NewsItem>) => void;
  onCancel: () => void;
  departments: Array<{ id: number; name: string; subDepartments?: string[] }>;
  divisions: Array<{ id: number; name: string }>;
  states: Array<{ id: number; name: string }>;
  cities: Array<{ id: number; name: string; state: string }>;
}

export const NewsPostForm: React.FC<NewsPostFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  departments,
  divisions,
  states,
  cities,
}) => {
  const [newsTitle, setNewsTitle] = useState(initialData?.title || '');
  const [source, setSource] = useState(initialData?.source || 'Print Media');
  const [subSource, setSubSource] = useState(initialData?.subSource || 'News Paper');
  const [zone, setZone] = useState(initialData?.zone || 'Northern Zone');
  const [division, setDivision] = useState(initialData?.division || 'Moradabad');
  const [department, setDepartment] = useState(initialData?.department || 'Commercial');
  const [subDepartment, setSubDepartment] = useState(initialData?.subDepartment || 'Passenger Amenities');
  const [state, setState] = useState(initialData?.state || 'Uttar Pradesh');
  const [city, setCity] = useState(initialData?.city || 'Hardoi');
  const getTodayFormatted = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [date, setDate] = useState(initialData?.date || getTodayFormatted());
  const [originUrl, setOriginUrl] = useState(initialData?.originUrl || '');
  const [mediaType, setMediaType] = useState<MediaType>(initialData?.mediaType || 'Print Media');
  const [sentiment, setSentiment] = useState<SentimentType>(initialData?.sentiment || 'Positive');
  const [accidentalNotification, setAccidentalNotification] = useState(initialData?.accidentalNotification || false);
  const [status, setStatus] = useState<PostStatus>(initialData?.status || 'Published');
  const [description, setDescription] = useState(
    initialData?.description ||
      `CITY - Hardoi - Amar Ujala - Page 4\nरेलवे माल गोदाम में बढ़ेगी बुनियादी सुविधाएं, सुधरेंगे प्लेटफार्म\nमजदूरों के बैठने के लिए प्लेटफार्म के शेड का होगा निर्माण, डीआरएम ने माल गोदाम का निरीक्षण कर दिए निर्देश।`
  );

  const [fileName, setFileName] = useState('No file chosen');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('Paragraph');

  // Dynamic sub-source options
  const getSubSources = () => {
    if (source === 'Print Media') return ['News Paper', 'Magazines', 'Weekly Journals', 'Gazette'];
    if (source === 'Electronic Media') return ['TV News Channels', 'Radio / FM', 'Regional Broadcast'];
    if (source === 'Social Media') return ['Twitter / X', 'Facebook', 'YouTube', 'Instagram'];
    return ['Online Portal', 'Web Wire'];
  };

  // Filter cities based on selected state
  const availableCities = cities.filter((c) => !state || c.state === state);

  // Filter sub-departments
  const currentDeptObj = departments.find((d) => d.name === department);
  const availableSubDepts = currentDeptObj?.subDepartments || ['General', 'Operations'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim()) {
      alert('Please enter a News Title.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        title: newsTitle,
        source,
        subSource,
        zone,
        division,
        department,
        subDepartment,
        state,
        city,
        date: date || getTodayFormatted(),
        time: '12:30 pm',
        originUrl,
        mediaType,
        sentiment,
        accidentalNotification,
        status,
        description,
        roleName: 'Content Analyst',
      });
      setIsSubmitting(false);
    }, 300);
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('post-desc-area') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = prefix + (selectedText || 'text') + suffix;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setDescription(newText);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      {/* Form Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-slate-200 rounded-md text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {initialData ? 'Edit News Post' : 'Add New News Post'}
            </h3>
            <p className="text-xs text-slate-500">
              Enter official press clipping information and media details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-5">
        {/* Row 1: News Title, Source, Sub source */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              News Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              placeholder="e.g. Amar Ujala - रेलवे माल गोदाम में बढ़ेगी बुनियादी सुविधाएं"
              required
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                const sub = e.target.value === 'Social Media' ? 'Twitter / X' : e.target.value === 'Electronic Media' ? 'TV News Channels' : 'News Paper';
                setSubSource(sub);
              }}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              <option value="Print Media">Print Media</option>
              <option value="Electronic Media">Electronic Media</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sub source</label>
            <select
              value={subSource}
              onChange={(e) => setSubSource(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              {getSubSources().map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Zone, Division, Department */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              <option value="Northern Zone">Northern Zone</option>
              <option value="Western Zone">Western Zone</option>
              <option value="Eastern Zone">Eastern Zone</option>
              <option value="Southern Zone">Southern Zone</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Division</label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              {divisions.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              {departments.map((dep) => (
                <option key={dep.id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Sub Department, State, City/Village */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sub Department</label>
            <select
              value={subDepartment}
              onChange={(e) => setSubDepartment(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              <option value="All Sub Department">All Sub Department</option>
              {availableSubDepts.map((sd) => (
                <option key={sd} value={sd}>
                  {sd}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                const matchingCities = cities.filter((c) => c.state === e.target.value);
                if (matchingCities.length > 0) {
                  setCity(matchingCities[0].name);
                }
              }}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              {states.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">City/Village</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              <option value="">Please Select</option>
              {availableCities.map((ct) => (
                <option key={ct.id} value={ct.name}>
                  {ct.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Date & News Origin Source Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
            <div className="relative">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD-MM-YYYY"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              News Origin Source (link)
            </label>
            <input
              type="url"
              value={originUrl}
              onChange={(e) => setOriginUrl(e.target.value)}
              placeholder="https://amarujala.com/news-article-link"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 5: Media Type & File Attachment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as MediaType)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
            >
              <option value="Print Media">Print Media</option>
              <option value="Electronic Media">Electronic Media</option>
              <option value="Social Media">Social Media</option>
              <option value="Digital / Web">Digital / Web</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Choose File</label>
            <div className="flex items-center space-x-2">
              <label className="px-3 py-2 bg-[#0070ba] text-white text-xs font-semibold rounded cursor-pointer hover:bg-[#005c9a] transition-colors shrink-0">
                Choose File
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileName(file.name);
                    }
                  }}
                />
              </label>
              <span className="text-xs text-slate-500 truncate">{fileName}</span>
            </div>
          </div>
        </div>

        {/* Row 6: Sentiment Radio buttons & Accidental Notification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Post Sentiment</label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="sentiment"
                  value="Positive"
                  checked={sentiment === 'Positive'}
                  onChange={() => setSentiment('Positive')}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span className="text-emerald-700 font-semibold">Positive</span>
              </label>
              <label className="inline-flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="sentiment"
                  value="Negative"
                  checked={sentiment === 'Negative'}
                  onChange={() => setSentiment('Negative')}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span className="text-rose-700 font-semibold">Negative</span>
              </label>
              <label className="inline-flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="sentiment"
                  value="Neutral"
                  checked={sentiment === 'Neutral'}
                  onChange={() => setSentiment('Neutral')}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span className="text-amber-700 font-semibold">Neutral</span>
              </label>
            </div>
          </div>

          <div>
            <label className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={accidentalNotification}
                onChange={(e) => setAccidentalNotification(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Accidental notification</span>
            </label>
          </div>
        </div>

        {/* Row 7: Status */}
        <div className="w-full md:w-1/3">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus)}
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
          >
            <option value="Published">Publish</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Row 8: Rich Post Description editor matching exact video toolbar */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Post Description</label>
          <div className="border border-slate-300 rounded-md overflow-hidden">
            {/* Formatting Toolbar matching video */}
            <div className="bg-slate-50 border-b border-slate-300 p-1.5 flex flex-wrap items-center gap-1 text-slate-600 text-xs">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-2 py-1 bg-white border border-slate-300 rounded text-xs focus:outline-none"
              >
                <option value="Paragraph">Paragraph</option>
                <option value="Heading 1">Heading 1</option>
                <option value="Heading 2">Heading 2</option>
                <option value="Heading 3">Heading 3</option>
              </select>

              <div className="h-4 w-px bg-slate-300 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting('**', '**')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5 font-bold" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<u>', '</u>')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Underline"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('~~', '~~')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Strikethrough"
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting('\n1. ')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n- ')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting('[', '](url)')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Insert Link"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('`', '`')}
                className="p-1 hover:bg-slate-200 rounded"
                title="Code"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description Textarea */}
            <textarea
              id="post-desc-area"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type full newspaper press clipping or report description..."
              className="w-full p-3 text-xs md:text-sm text-slate-800 focus:outline-none font-serif leading-relaxed"
            />
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="pt-3 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-md text-xs font-bold shadow-xs transition-colors flex items-center space-x-2"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Submit</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
