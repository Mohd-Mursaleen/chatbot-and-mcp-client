import React, { useState, useMemo } from 'react';
import { ChevronDown, Send } from 'lucide-react';

interface ChatModel {
  model: string;
  name: string;
}

interface PromptInputProps {
  placeholder?: string;
  setInput: (value: string) => void;
  input: string;
  onStop: () => void;
  append: (message: any) => void;
  isLoading?: boolean;
  model?: ChatModel;
  setModel?: (model: ChatModel) => void;
  threadId?: string;
}

const availableModels: ChatModel[] = [
  { model: 'gpt-4.1', name: 'GPT-4.1' },
  { model: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { model: 'claude-3', name: 'Claude 3' },
];

// Simple Button component
const Button = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'default',
  size = 'default',
  className = '',
  ...props 
}: any) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
  };
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple Select component
const Select = ({ children, onValueChange, defaultValue }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    // setSelectedValue(value);
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {availableModels.map((model) => (
            <div
              key={model.model}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(model.model)}
            >
              {model.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function PromptInput({
  placeholder = "Type your message here",
  append,
  model,
  setModel,
  input,
  setInput,
  isLoading = false,
}: PromptInputProps) {
  const [selectedModel, setSelectedModel] = useState(model?.model || 'gpt-4');

  const currentModel = useMemo(() => {
    return availableModels.find(m => m.model === selectedModel) || availableModels[0];
  }, [selectedModel]);

  const handleModelChange = (modelValue: string) => {
    const newModel = availableModels.find(m => m.model === modelValue);
    if (newModel) {
      setSelectedModel(modelValue);
      setModel?.(newModel);
    }
  };

  const submit = () => {
    if (isLoading) return;
    const userMessage = input?.trim() || "";
    if (userMessage.length === 0) return;
    
    setInput("");
    append({
      role: "user",
      content: userMessage,
      parts: [
        {
          type: "text",
          text: userMessage,
        },
      ],
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {/* Input Area */}
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Model Selection */}
            <Select
              defaultValue={selectedModel}
              onValueChange={handleModelChange}
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                {currentModel.name}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </Select>

            {/* Submit Button */}
            <Button
              onClick={submit}
              disabled={isLoading || !input.trim()}
              className="gap-2"
            >
              {isLoading ? 'Sending...' : 'Send'}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}