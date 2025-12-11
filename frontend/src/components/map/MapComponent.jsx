import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom blue marker icon
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Default center (Mumbai, India)
const defaultCenter = [19.0760, 72.8777]

export default function MapComponent({ locations, searchQuery, searchCenter }) {
  // Filter locations based on search query (if any)
  const filteredLocations = locations.filter((location) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      location.name?.toLowerCase().includes(query) ||
      location.hostelAddress?.toLowerCase().includes(query)
    )
  })

  // Get center position - use searchCenter if provided, otherwise calculate from locations
  const getCenter = () => {
    // If searchCenter is provided (from geocoding), use it
    if (searchCenter) {
      return [searchCenter.lat, searchCenter.lng]
    }
    
    // Otherwise, use default or calculate from locations
    if (filteredLocations.length === 0) return defaultCenter
    
    const locationsWithCoords = filteredLocations.filter(
      loc => loc.latitude && loc.longitude
    )
    
    if (locationsWithCoords.length === 0) return defaultCenter
    
    // Calculate average position
    const avgLat = locationsWithCoords.reduce((sum, loc) => sum + loc.latitude, 0) / locationsWithCoords.length
    const avgLng = locationsWithCoords.reduce((sum, loc) => sum + loc.longitude, 0) / locationsWithCoords.length
    
    return [avgLat, avgLng]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '2rem' }}
    >
      <div style={{
        height: '500px',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <MapContainer
          center={getCenter()}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* OpenStreetMap Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markers for each location */}
          {filteredLocations.map((location) => {
            // Only show markers for locations with coordinates
            if (!location.latitude || !location.longitude) return null

            return (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={blueIcon}
              >
                <Popup>
                  <div style={{
                    padding: '0.5rem',
                    minWidth: '200px',
                  }}>
                    <h3 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                    }}>
                      {location.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                    }}>
                      <FiMapPin style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                      <p style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        lineHeight: '1.4',
                      }}>
                        {location.hostelAddress}
                      </p>
                    </div>
                    {location.phone && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem',
                      }}>
                        <FiPhone style={{ color: '#6b7280' }} />
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: '#6b7280',
                        }}>
                          {location.phone}
                        </p>
                      </div>
                    )}
                    {location.email && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}>
                        <FiMail style={{ color: '#6b7280' }} />
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: '#6b7280',
                        }}>
                          {location.email}
                        </p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>

      {filteredLocations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#fef3c7',
            borderRadius: '0.5rem',
            textAlign: 'center',
            color: '#92400e',
          }}
        >
          <p style={{ margin: 0 }}>No PG/Hostels found matching your search.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
