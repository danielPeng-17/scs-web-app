import { Box, Typography } from '@mui/material';
import { Container } from '../../components/container/Container';

const teamMembers = [
  {
    name: 'Daniel',
    bio: 'Daniel has experience in building web applications using React and Redux.'
  },
  {
    name: 'Danny',
    bio: 'Danny has expertise in HTML, CSS, and JavaScript. He is passionate about creating responsive and accessible user interfaces.'
  },
  {
    name: 'Kingly',
    bio: 'Kingly is a web development enthusiast with expertise in HTML, CSS, and JavaScript.'
  },
  {
    name: 'Kishor',
    bio: 'Kishor has a passion for front-end development.'
  }
];

export const AboutUs = () => {
    return (
    
      <Container name="About Us">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {teamMembers.map((member) => (
            <Box key={member.name} sx={{ mb: 5, width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' } }}>
              <Box sx={{ borderRadius: '50%', overflow: 'hidden', width: 200, height: 200, mx: 'auto', mb: 2, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <Box component="img" src={`https://eu.ui-avatars.com/api/?name=${member.name.charAt(0)}&background=random&size=200`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontSize: '1.5rem' }}>{member.name}</Typography>
              <Typography sx={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: 1.5 }}>{member.bio}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    );
  };