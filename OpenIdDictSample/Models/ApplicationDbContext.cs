﻿using Microsoft.EntityFrameworkCore;

namespace OpenIdDictSample.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
