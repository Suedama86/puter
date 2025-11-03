import { ChevronDown, Plus, Search, MessageSquare, Trash2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MODEL_CATEGORIES, getModelsByCategory } from "@/lib/models";
import { useState, useEffect } from "react";
import { getConversations, deleteConversation } from "@/lib/storage";
import { Conversation } from "@shared/schema";

interface AppSidebarProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
  onNewChat: () => void;
  onLoadConversation?: (conversation: Conversation) => void;
  refreshTrigger?: number;
}

export function AppSidebar({
  selectedModel,
  onModelSelect,
  temperature,
  onTemperatureChange,
  onNewChat,
  onLoadConversation,
  refreshTrigger,
}: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["OpenAI"]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      loadConversations();
    }
  }, [refreshTrigger]);

  const loadConversations = () => {
    const saved = getConversations();
    setConversations(saved.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 10));
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(id);
    loadConversations();
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredCategories = MODEL_CATEGORIES.filter((category) => {
    if (!searchQuery) return true;
    const models = getModelsByCategory(category);
    return models.some(
      (model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNewChat}
          className="w-full gap-2"
          variant="default"
          data-testid="button-new-chat"
        >
          <Plus className="h-4 w-4" />
          Ny konversation
        </Button>
      </SidebarHeader>

      <SidebarContent>
        {conversations.length > 0 && (
          <SidebarGroup>
            <Collapsible open={showHistory} onOpenChange={setShowHistory}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 h-9 hover-elevate"
                  data-testid="button-toggle-history"
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Historik ({conversations.length})
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showHistory ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pt-1 px-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="group flex items-center gap-2 px-3 py-2 rounded-md hover-elevate cursor-pointer text-sm"
                    onClick={() => onLoadConversation?.(conv)}
                    data-testid={`button-load-conversation-${conv.id}`}
                  >
                    <span className="flex-1 truncate">{conv.title}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      data-testid={`button-delete-conversation-${conv.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Modeller</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Sök 400+ modeller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
                data-testid="input-search-models"
              />
            </div>

            <div className="space-y-2">
              {filteredCategories.map((category) => {
                const models = getModelsByCategory(category).filter(
                  (model) =>
                    !searchQuery ||
                    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.id.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (models.length === 0) return null;

                return (
                  <Collapsible
                    key={category}
                    open={openCategories.includes(category)}
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-2 h-8 hover-elevate"
                        data-testid={`button-toggle-${category.toLowerCase()}`}
                      >
                        <span className="text-sm font-medium">{category}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openCategories.includes(category) ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pt-1">
                      <SidebarMenu>
                        {models.map((model) => (
                          <SidebarMenuItem key={model.id}>
                            <SidebarMenuButton
                              onClick={() => onModelSelect(model.id)}
                              isActive={selectedModel === model.id}
                              className="h-8 px-3"
                              data-testid={`button-select-model-${model.id}`}
                            >
                              <span className="text-sm truncate">{model.name}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Temperatur</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Kreativitet</span>
                <span className="text-sm font-medium" data-testid="text-temperature-value">
                  {temperature.toFixed(1)}
                </span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(values) => onTemperatureChange(values[0])}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
                data-testid="slider-temperature"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fokuserad (0)</span>
                <span>Kreativ (2)</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
