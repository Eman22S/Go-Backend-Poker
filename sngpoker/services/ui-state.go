package services

import (
	"sngrpc/sngpoker"

	"golang.org/x/net/context"
)

// GetAllUiSettings returns current user's ui setting
func (s *Server) GetAllUiSettings(
	ctx context.Context,
	uiSettintsRequest *sngpoker.UiSettingsRequest,
) (*sngpoker.UiSettingsResponse, error) {
	resp := &sngpoker.UiSettingsResponse{Result: "{theme: 'dark'}"}
	return resp, nil
}
