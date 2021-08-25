package services

import (
	"golang.org/x/net/context"
)

// GetAllUiSettings returns current user ui setting
func (s *Server) GetAllUiSettings(
	ctx context.Context,
	uiSettingRequest *UiSettingsRequest) (*UiSettingsResponse, error) {

	return &UiSettingsResponse{Result: "{'theme':'dark'}"}, nil
}
