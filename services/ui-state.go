package services

import (
	"golang.org/x/net/context"
)

// GetAllUiSettings returns current user's ui setting
func (s *Server) GetAllUiSettings(
	ctx context.Context,
	uiSettintsRequest *UiSettingsRequest,
) (*UiSettingsResponse, error) {
	resp := &UiSettingsResponse{Result: "{theme: 'dark'}"}
	return resp, nil
}
